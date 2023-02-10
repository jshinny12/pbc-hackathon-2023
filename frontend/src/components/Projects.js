import React, { useState } from 'react';

const Card = ({ image, name, goal, raised, isComplete, subtasks }) => {
  const [cardHeight, setCardHeight] = useState(450);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const progressPercent = (Number(raised) / Number(goal)) * 100;

  const Subtask = ({ title, target, raised }) => (
    <div>
      <h4>{title}</h4>
      <div style={progressBarStyles}>
        <div
          style={{
            ...progressStyles,
            width: `${(raised / target) * 100}%`
          }}/>
      </div>
      <p>${raised} / ${target}</p>
    </div>
  );

  const SubtaskList = ({ subtasks }) => (
    <div>
      {Object.entries(subtasks).map(([key, subtask]) => (
        <Subtask key={key} title={subtask.title} target={subtask.target} raised={subtask.raised} />
      ))}
    </div>
    );

    const toggleSubtasks = () => {
      setShowSubtasks(!showSubtasks);
      if (showSubtasks) {
        setCardHeight(450);
      } else {
        setCardHeight(450 + Object.keys(subtasks).length * 120);
      }
    };

    return (
      <div style={{ ...cardStyles, height: cardHeight }}>
        <img src={image} alt={name} style={cardImageStyles} />
        <p style={cardTextStyles}>{isComplete ? 'Complete' : 'On Going'}</p>
        <h3 style={cardTitleStyles}>{name}</h3>
        <p style={cardTextStyles}>Fundraising Goal: ${goal}</p>
        <p style={cardTextStyles}>Fundraising Raised: ${raised}</p>
        <div style={progressBarStyles}>
          <div
            style={{
              ...progressStyles,
              width: `${progressPercent}%`
            }}/>
        </div>
        <button style={donateButtonStyles} onClick={toggleSubtasks}>
        {showSubtasks ? 'Collapse' : 'Expand'}
      </button>
      {showSubtasks && <SubtaskList subtasks={subtasks} />}
      </div>
    );
};

const Projects = ({ cards }) => {
    return (
      <div style={gridStyles}>
        {cards.map(card => (
          <Card
            key={card.name}
            image={card.image}
            name={card.name}
            goal={card.goal}
            raised={card.raised}
            isComplete={card.isComplete}
            subtasks = {card.subtasks}
          />
        ))}
      </div>
    );
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '40px'
};

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 300,
  height: 1000,
  margin: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: 10,
  overflow: 'hidden'
};

const cardImageStyles = {
  width: '100%',
  height: 200
};

const cardTitleStyles = {
  fontSize: 20,
  marginTop: 3
};

const cardTextStyles = {
  fontSize: 16,
  marginTop: 5,
  textAlign: 'center'
};

const progressBarStyles = {
  width: '80%',
  border: '1px solid #333',
  borderRadius: 10,
};

const progressStyles = {
  height: '100%',
  minWidth: 1,
  backgroundColor: 'green',
  border: '0.5px solid green',
  borderRadius: 10
};

const donateButtonStyles = {
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:15
}

export default Projects;