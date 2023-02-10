import React from 'react';
import Projects from './Projects';

const Homepage = () => {

    const cards = [
        {
          image: 'https://research.umich.edu/wp-content/uploads/2021/08/coronavirus.png',
          name: 'Covid Research',
          goal: 5000,
          raised: 2000,
          isComplete: false,
          subtasks:[
            {
            title: "Application Grant",
            target: 1000,
            raised: 400
            },
            {
            title: "Research equipment",
            target: 2000,
            raised: 800
            },
            {
            title: "Transportation",
            target: 2000,
            raised: 800
            }
        ],
        },
        {
          image: 'https://img.hani.co.kr/imgdb/resize/2015/1016/144487802343_20151016.JPG',
          name: 'Building a boat',
          goal: 6000,
          raised: 4000,
          isComplete: true,
          subtasks:[
            {
              title: "Purchasing materials",
              target: 3000,
              raised: 1500
            },
            {
              title: "Commerical license",
              target: 2000,
              raised: 2000
            },
            {
              title: "Transportation",
              target: 1000,
              raised: 500
            }
          ],
    }
    ];
    return(
        <div className="homepage">
            <nav className="navbar">
                <div className="title">Proj-ether</div>
                <div className="nav-items">
                    <div className="nav-item">Projects</div>
                    <div className="nav-item">Profile</div>
                </div>
            </nav>
            <div style={{ padding: 20 }}>
                <Projects cards={cards} />
            </div>
        </div>  
    )
}

export default Homepage