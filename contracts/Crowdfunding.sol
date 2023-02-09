pragma solidity ^0.8.0;

contract Crowdfunding {

    struct Campaign {
        address payable owner;
        string name;
        string image;

        uint256 goal;
        uint256 amountRaised;

        uint256 totalTasks;
    }

    struct Task {
        uint256 taskId;
        uint256 taskAmount;
        uint256 taskAmountRaised;
    }

    // ***** STORAGE MAPPINGS *****

    // create a mapping of campaignId => Campaign
    mapping (uint256 => Campaign) public campaigns;

    // create a mapping of owner address => Campaign
    mapping (address => Campaign) public campaignOwners;

    // create a mapping of address => Campaign
    mapping (address => Campaign) public campaignContributors;

    // create a mapping of address => campaignId => Task
    mapping (address => mapping (uint256 => Task)) public taskContributor;

    // ***** CAMPAIGN MAPPINGS *****

    // create a mapping from each campaign to its sub tasks: campaignId => taskId => Task
    mapping (uint256 => mapping (uint256 => Task)) public campaignTasks;

    // create a mapping from each campaign to its contributors: campaignId => address => amount
    mapping (uint256 => mapping (address => uint256)) public campaignContributions;

    // ***** TASK MAPPINGS *****

    // create a mapping from each task to its contributors: campaignId => taskId => address => amount
    mapping (uint256 => mapping (uint256 => mapping (address => uint256))) public taskContributions;

    // create a mapping from each task to its progress: campaignId => taskId => Image => Text
    mapping (uint256 => mapping (uint256 => mapping (string => string))) public taskProgress;


    // ***** USER MAPPINGS *****

    // create a mapping from each user to campaigns they have contributed to: address => campaignId
    mapping (address => uint256) public userToCampaignId;

    // create a mapping from each user to tasks they have contributed to: address => campaignId => taskId
    mapping (address => mapping (uint256 => uint256)) public userToTaskId;

    // ***** CAMPAIGN FUNCTIONS *****

    uint256 public campaignCount = 0;

    event FundTransfer(uint campaignID, address backer, uint256 amount, uint256 total);

    function createCampaign(string memory _name, string memory _image, uint256 _goal) public {
        Campaign memory newCampaign = Campaign({
            owner: payable(msg.sender),
            name: _name,
            image: _image,
            goal: _goal,
            amountRaised: 0,
            totalTasks: 0
        });

        campaigns[campaignCount] = newCampaign;
        campaignOwners[msg.sender] = newCampaign;
        campaignCount++;
    }

    function contribute(uint campaignID, uint taskID) public payable {
        require(campaignID > 0 && campaignID <= campaignCount, "Campaign not found.");
        Campaign storage campaign = campaigns[campaignID];
                    require(msg.value > 0, "Contribution must be greater than zero.");

        if (taskID == 0) {
            require(campaign.amountRaised + msg.value <= campaign.goal, "Campaign goal has been reached.");
            campaign.amountRaised += msg.value;
            campaignContributions[campaignID][msg.sender] += msg.value;

            emit FundTransfer(campaignID, msg.sender, msg.value, campaign.amountRaised);

        } else {
            require(taskID > 0 && taskID <= campaign.totalTasks, "Task not found.");
            Task storage task = campaignTasks[campaignID][taskID];
            require(msg.value > 0, "Contribution must be greater than zero.");
            require(task.taskAmountRaised + msg.value <= task.taskAmount, "Task goal has been reached.");

            task.taskAmountRaised += msg.value;

            emit FundTransfer(campaignID, msg.sender, msg.value, task.taskAmountRaised);
        }
    }

    function getCampaign(uint campaignID) public view returns (address, uint256, uint256, uint256) {
        // require(campaignID > 0 && campaignID <= campaignCount, "Campaign not found.");
        // Campaign storage campaign = campaigns[campaignID];
        // return (campaign.owner, campaign.goal, campaign.deadline, campaign.amountRaised);
    }

    function getTask(uint campaignID, uint taskID) public view returns (uint256, uint256, uint256) {
        // require(campaignID > 0 && campaignID <= campaignCount, "Campaign not found.");
        // Campaign storage campaign = campaigns[campaignID];

        // require(taskID > 0 && taskID <= campaign.totalTasks, "Task not found.");
        // Task storage task = campaignTasks[campaignID][taskID];
        // return (task.taskAmount, task.taskDeadline, task.taskAmountRaised);
    }

    function getCampaignCount() public view returns (uint) {
        return campaignCount;
    }
}
