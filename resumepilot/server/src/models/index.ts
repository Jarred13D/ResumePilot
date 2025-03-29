import sequelize from '../config/connection.js'
// import { Sequelize } from 'sequelize';

// import all factory functions
import { UserFactory } from './user.js';
import { ResumeFactory } from "./resume";
import { CertificationFactory, setupCertificationAssociations } from './certification';
import { ContactFactory } from './contact';
import { ExperienceFactory, setupExperienceAssociations } from './experience';
import { EducationFactory, setupEducationAssociations } from './education';

// init models
const User = UserFactory(sequelize);
const Resume = ResumeFactory(sequelize);
const Certification = CertificationFactory(sequelize);
const Contact = ContactFactory(sequelize);
const Experience = ExperienceFactory(sequelize);
const Education = EducationFactory(sequelize);

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

// export initalized models
export {
  User,
  Resume,
  Certification,
  Contact,
  Experience,
  Education
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
} from './experience';
  
  // if needed
export { sequelize };

// export default object with all models
export default {
  User,
  Resume,
  Certification,
  Contact,
  Experience,
  Education
};