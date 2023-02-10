// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {

    struct Campaign {
        address payable owner;
        string name;
        string image;
        uint256 campaignId;
        uint256 goal;
        uint256 amountRaised;
        uint256 totalTasks;
        bool isComplete;
    }

    struct Task {
        string title;
        uint256 taskId;
        uint256 taskAmount;
        uint256 taskAmountRaised;
        bool isComplete;
    }

    struct Update {
        string image;
        string text;
    }

    // ***** STORAGE MAPPINGS *****

    // create a mapping of campaignId => Campaign
    mapping (uint256 => Campaign) public campaigns;

    // create a mapping of owner address => Campaign
    mapping (address => Campaign) public campaignOwners;


    // ***** CAMPAIGN MAPPINGS *****

    // create a mapping from each campaign to its sub tasks: campaignId => taskId => Task
    mapping (uint256 => mapping (uint256 => Task)) public campaignTasks;

    // create a mapping from each campaign to its contributors: campaignId => address => amount
    mapping (uint256 => mapping (address => uint256)) public campaignContributions;

    // ***** TASK MAPPINGS *****

    // create a mapping from each task to its contributors: campaignId => taskId => address => amount
    mapping (uint256 => mapping (uint256 => mapping (address => uint256))) public taskContributions;

    // create a mapping from each task to its progress: campaignId => taskId => Image => Text
    mapping (uint256 => mapping (uint256 => Update[])) public taskProgress;


    // ***** USER MAPPINGS *****

    // create a mapping from each user to campaigns they have contributed to: address => campaignId
    mapping (address => uint256[]) public userToCampaignId;

    // create a mapping from each user to tasks they have contributed to: address => campaignId => taskId
    mapping (address => mapping (uint256 => uint256[])) public userToTaskId;

    // ***** CAMPAIGN FUNCTIONS *****

    uint256 public campaignCount = 0;

    event FundTransfer(uint campaignID, address backer, uint256 amount, uint256 total);

    function createCampaign(string memory _name, string memory _image, uint256 _goal) public {
        Campaign memory newCampaign = Campaign({
            owner: payable(msg.sender),
            name: _name,
            campaignId: campaignCount,
            image: _image,
            goal: _goal,
            amountRaised: 0,
            totalTasks: 0,
            isComplete: false
        });

        campaigns[campaignCount] = newCampaign;
        campaignOwners[msg.sender] = newCampaign;
        campaignCount++;
    }

    function createTask(string memory _title, uint campaignID, uint256 _taskAmount) public {
        require(campaignID >= 0 && campaignID <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignID];
        require(msg.sender == campaign.owner, "Only the campaign owner can create tasks.");

        Task memory newTask = Task({
            title: _title,
            taskId: campaign.totalTasks + 1,
            taskAmount: _taskAmount,
            taskAmountRaised: 0,
            isComplete: false
        });

        campaignTasks[campaignID][campaign.totalTasks + 1] = newTask;
        campaign.totalTasks++;
    }

    function addTaskProgress(uint campaignId, uint taskId, string memory _image, string memory _text) public {
        require(campaignId >= 0 && campaignId <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.owner, "Only the campaign owner can add task progress.");

        taskProgress[campaignId][taskId].push(Update({
            image: _image,
            text: _text
        }));

    }

    // create a close campaign function that can only be called by the campaign owner
    function closeCampaign(uint256 campaignId) public {
        require(campaignId >= 0 && campaignId <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.owner, "Only the campaign owner can close the campaign.");
        require(campaign.amountRaised >= campaign.goal, "Campaign goal has not been reached.");

        campaign.isComplete = true;
    }

    // create a close task function that can only be called by the campaign owner
    function closeTask(uint256 campaignId, uint256 taskId) public {
        require(campaignId >= 0 && campaignId <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.owner, "Only the campaign owner can close the task.");
        require(taskId > 0 && taskId <= campaign.totalTasks, "Task not found.");
        Task storage task = campaignTasks[campaignId][taskId];
        require(task.taskAmountRaised >= task.taskAmount, "Task goal has not been reached.");

        task.isComplete = true;
    }

    function withdrawFromCampaign(uint256 campaignId) public payable {
        require(campaignId >= 0 && campaignId <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.owner, "Only the campaign owner can withdraw funds.");
        require(campaign.isComplete == true, "Campaign is not complete.");

        uint256 amount = campaign.amountRaised;
        campaign.owner.transfer(amount);
    }

    function contribute(uint campaignID, uint taskID) public payable {
        uint256 amount = msg.value;
        require(campaignID >= 0 && campaignID <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignID];
        require(amount > 0, "Contribution must be greater than zero.");
        require(campaign.isComplete == false, "Campaign is complete");

        if (taskID == 0) {
            require(campaign.amountRaised + amount <= campaign.goal, "Campaign goal has been reached.");
            
            campaign.amountRaised += amount;

            campaignContributions[campaignID][msg.sender] += amount;
            userToCampaignId[msg.sender].push(campaignID);

            emit FundTransfer(campaignID, msg.sender, amount, campaign.amountRaised);


        } else {
            require(taskID > 0 && taskID <= campaign.totalTasks, "Task not found.");
            Task storage task = campaignTasks[campaignID][taskID];
            require(task.isComplete == false, "Task is complete");
            require(task.taskAmountRaised + amount <= task.taskAmount, "Task goal has been reached.");

            task.taskAmountRaised += amount;
            campaign.amountRaised += amount;

            campaignContributions[campaignID][msg.sender] += amount;
            taskContributions[campaignID][taskID][msg.sender] += amount;
            userToCampaignId[msg.sender].push(campaignID);
            userToTaskId[msg.sender][campaignID].push(taskID);

            emit FundTransfer(campaignID, msg.sender, amount, task.taskAmountRaised);
            if (task.taskAmountRaised >= task.taskAmount) {
                task.isComplete = true;
            }
        }

        if (campaign.amountRaised >= campaign.goal) {
            campaign.isComplete = true;
        }

    }


    // ***** GETTER FUNCTIONS *****

    function getCampaign(uint campaignID) external view returns (address, string memory, uint256, uint256, uint256, bool) {
        require(campaignID >= 0 && campaignID <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignID];
        return (campaign.owner, campaign.name, campaign.goal, campaign.amountRaised, campaign.totalTasks, campaign.isComplete);
    }

    function getTask(uint campaignID, uint taskID) external view returns (string memory, uint256, uint256, bool) {
        require(campaignID >= 0 && campaignID <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignID];
        require(taskID >= 0 && taskID <= campaign.totalTasks, "Task not found.");
        Task storage task = campaignTasks[campaignID][taskID];
        return (task.title, task.taskAmount, task.taskAmountRaised, task.isComplete);
        
    }

    function getCampaignIds() external view returns (uint256[] memory) {
        uint256[] memory allCampaigns = new uint256[](campaignCount);
        
        for (uint i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i].campaignId;
        }

        return allCampaigns;
    }

    function getTaskIds(uint campaignID) external view returns (uint256[] memory) {
        require(campaignID >= 0 && campaignID <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignID];

        uint256[] memory allTasks = new uint256[](campaign.totalTasks);
        
        for (uint i = 0; i < campaign.totalTasks; i++) {
            allTasks[i] = campaignTasks[campaignID][i].taskId;
        }

        return allTasks;
    }

    // function to get list of campaigns for a user
    function getUserCampaigns(address user) external view returns (uint256[] memory) {
        return userToCampaignId[user];
    }

    // function to get list of tasks for a user's campaign
    function getUserTasks(address user, uint campaignID) external view returns (uint256[] memory) {
        return userToTaskId[user][campaignID];
    }

    function getUserContributionByCampaign(address user, uint256 campaignId) external view returns (uint256 ) {
        return campaignContributions[campaignId][user];
    }

    function getUserContributionByTask(address user, uint256 campaignId, uint256 taskId) external view returns (uint256) {
        return taskContributions[campaignId][taskId][user];
    }

    function getCampaignCount() external view returns (uint256) {
        return campaignCount;
    }

}
