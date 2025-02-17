import React from 'react';

import {
  Intro,
  AboutSection
} from '../../components';
import {
  Footer,
  LanguageSection,
  ResumeSection,
  ReferenceSection,
  TechnologyStack,
  SkillSection
} from '../../containers';

import * as Constants from '../../constants';
import './LandingPage.scss';

const LandingPage = props => (
  <div className="landing-page">
    <Intro
      {...props}
      headline={Constants.IntroHeadline}
      subHeadline={Constants.IntroSubHeadline}
    />
    <AboutSection
      {...props}
      paragraphs={Constants.AboutSectionParagraphs}
    />
    <section className="skills">
      <SkillSection
        {...props}
        skills={Constants.Skills}
        skillSectionHeader={Constants.SkillSectionHeader}
      />
      <LanguageSection
        {...props}
        languages={Constants.Languages}
        languageSectionHeader={Constants.LanguageSectionHeader}
      />
    </section>
    <ResumeSection
      {...props}
    />
    <ReferenceSection
      {...props}
    />
    <TechnologyStack />
    <Footer
      {...props}
    />
  </div>
);


export default LandingPage;
