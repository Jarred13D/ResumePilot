// Create a new file like resumeAggregator.ts
import {
  User,
  Contact,
  Experience,
  Education,
  Certification,
  Skill,
  Resume,
} from "../../models/index.js";

type ResumeWithAssociations = typeof Resume & {
  contact: InstanceType<typeof Contact>;
  experiences: InstanceType<typeof Experience>[];
  education: InstanceType<typeof Education>[];
  certifications: InstanceType<typeof Certification>[];
  skills: InstanceType<typeof Skill>[];
};

type UserWithResumes = typeof User & {
  resumes: ResumeWithAssociations[];
};

async function aggregateUserData(userId: number) {
  try {
    // Get user data with all associated information & explicitly type the userData response
    const userData = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Resume,
          as: "resumes",
          include: [
            {
              model: Contact,
              as: "contact",
            },
            {
              model: Experience,
              as: "experiences",
            },
            {
              model: Education,
              as: "education",
            },
            {
              model: Certification,
              as: "certifications",
            },
            {
              model: Skill,
              as: "skills",
            },
          ],
        },
      ],
    }) as UserWithResumes | null;

    if (!userData) {
      throw new Error("User data not found");
    }

    if (!userData.resumes || userData.resumes.length === 0) {
      throw new Error("No resumes found for the user");
    }
    const resume = userData.resumes[0];

    // Get the first resume (assuming one resume per user for now)
    const contact = resume.contact;

    // Format the data into a structured string
    const promptData = `
      Contact Information:
      Name: ${contact.firstName} ${contact.lastName}
      Email: ${contact.email}
      Phone: ${contact.phone}
      Location: ${contact.city}, ${contact.state}

      Professional Experience:
      ${resume.experiences
        ?.map(
          (exp: InstanceType<typeof Experience>) => `
        Company: ${exp.company}
        Position: ${exp.position}
        Duration: ${exp.startDate} - ${exp.endDate}
        Description: ${exp.description}
      `
        )
        .join("\n")}

      Education:
      ${resume.education
        ?.map(
          (edu: InstanceType<typeof Education>) => `
        School: ${edu.institution}
        Degree: ${edu.degree}
        Field: ${edu.fieldOfStudy}
        Graduation: ${edu.graduationDate}
      `
        )
        .join("\n")}

      Certifications:
    ${resume.certifications
      ?.map(
        (cert: InstanceType<typeof Certification>) => `
            Name: ${cert.name}
            Issuer: ${cert.issuingOrganization}
            Date: ${cert.issueDate}`
      )
      .join("\n")}

      Skills:
    ${resume.skills?.map((skill: InstanceType<typeof Skill>) => skill.name).join(", ")}
    `;

    return promptData.trim();
  } catch (error) {
    console.error("Error aggregating user data:", error);
    throw error;
  }
}

// Express endpoint example
import express from "express";
const router = express.Router();

router.get("/generate-resume/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const aggregatedData = await aggregateUserData(userId);

    // Here you would typically send this to your AI service
    // const aiPrompt = `Please create a professional resume using the following information:\n${aggregatedData}`;
    // const aiResponse = await yourAIService.generateResume(aiPrompt);

    res.json({
      success: true,
      data: aggregatedData,
      // aiResponse: aiResponse // Once you implement AI integration
    });
} catch (error) {
    res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error),
    });
}
});

export default router;


// import { User, Resume, Skill, Certification, Contact, Experience, Education, Project } from '../../models';

// const user = new User(/* user data */);
// const resume = new Resume(/* resume data */);
// const skills = [new Skill(/* skill data */), new Skill(/* skill data */)];
// const certifications = [new Certification(/* certification data */)];
// const contact = new Contact(/* contact data */);
// const experience = [new Experience(/* experience data */)];
// const education = [new Education(/* education data */)];
// const projects = [new Project(/* project data */)];

// const resumeString = `
// User: ${user.name}
// Resume: ${Resume.title}
// Skills: ${skills.map(skill => skill.name).join(', ')}
// Certifications: ${certifications.map(cert => cert.title).join(', ')}
// Contact: ${contact.email}
// Experience: ${experience.map(exp => `${exp.jobTitle} at ${exp.company}`).join(', ')}
// Education: ${education.map(edu => `${edu.degree} from ${edu.institution}`).join(', ')}
// Projects: ${projects.map(pro => `${pro.title}, ${pro.description}, ${pro.startDate}, ${pro.technologies}, ${pro.url}, ${pro.githubUrl}`).join(' , ')}
// `;

// console.log(resumeString);
