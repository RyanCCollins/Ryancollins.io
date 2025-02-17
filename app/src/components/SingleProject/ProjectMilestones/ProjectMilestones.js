import React, { PropTypes } from 'react';
import { Column } from 'react-foundation';
import { GoMilestone } from 'react-icons/lib/go';
import Divider from '../../Divider/Divider';

const ProjectMilestones = ({
  project
}) => (
  <Column className="milestones-section" small={12} large={8} isColumn centerOnSmall>
    <h1 className="section-header">
      <GoMilestone />
        {' Milestones '}
      <GoMilestone />
    </h1>
    <Divider />
    <div className="project-milestones callout">
      <ul className="starred">
        {project.milestones.map((milestone, i) =>
          <li key={i}>
            <p className="paragraph-text">
              {milestone}
            </p>
          </li>)
        }
      </ul>
    </div>
  </Column>
);

ProjectMilestones.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectMilestones;
