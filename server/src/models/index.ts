import sequelize from '../config/connection.js'
// import { Sequelize } from 'sequelize';

// import all factory functions
import { UserFactory } from './user.js';
import { ResumeFactory } from "./resume.js";
import { CertificationFactory, setupCertificationAssociations } from './certification.js';
import { ContactFactory } from './contact.js';
import { ExperienceFactory, setupExperienceAssociations } from './experience.js';
import { EducationFactory, setupEducationAssociations } from './education.js';
import { SkillFactory, setupSkillAssociations } from './skills.js';
// import { ProjectFactory, setupProjectAssociations } from './projects.js';

// init models
const User = UserFactory(sequelize);
const Resume = ResumeFactory(sequelize);
const Certification = CertificationFactory(sequelize);
const Contact = ContactFactory(sequelize);
const Experience = ExperienceFactory(sequelize);
const Education = EducationFactory(sequelize);
const Skill = SkillFactory(sequelize);
// const Project = ProjectFactory(sequelize);

// setup all assocaitions
User.hasMany(Resume, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "resumes",
});

Resume.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
  as: "user",
});

Resume.hasMany(Skill, {
  sourceKey: "id",
  foreignKey: "resumeId",
  as: "skills",
});

// Project.hasMany(Skill, {
//   sourceKey: "id",
//   foreignKey: "projectId",
//   as: "skills",
// });

// Resume.hasMany(Project, {
//   sourceKey: "id",
//   foreignKey: "resumeId",
//   as: "projects",
// })

Skill.belongsTo(Resume, {
  targetKey: "id",
  foreignKey: "resumeId",
  as: "resume",
});

// Contact assoc as one-to-one relationship
Resume.hasOne(Contact, {
  sourceKey: "id",
  foreignKey: "resumeId",
  as: "contact",
});

Contact.belongsTo(Resume, {
  targetKey: "id",
  foreignKey: "resumeId",
  as: "resume",
});

// Experience assocs
setupExperienceAssociations({
  Resume,
  Experience,
});

// Education assocs
setupEducationAssociations({
  Resume,
  Education,
});

// Certification assocs
setupCertificationAssociations({
  Resume,
  Certification,
});

// Skill assocs
setupSkillAssociations({
  Resume,
  Skill,
});

// Project assocs
// setupProjectAssociations({
//   Resume,
//   Project,
// });

// export initalized models
export {
  User,
  Resume,
  Certification,
  Contact,
  Experience,
  Education,
  Skill,
  // Project
};
  
// export types if needed
// export type {
//   UserAttributes,
//   ResumeAttributes,
//   CertificationAttributes,
//   ContactAttributes,
//   ExperienceAttributes,
//   EducationAttributes
// };

export {
  ExperienceService
} from './experience.js';
  
  // if needed
export { sequelize };

// export default object with all models
export default {
  User,
  Resume,
  Certification,
  Contact,
  Experience,
  Education,
  Skill,
  // Project
};
