export interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    degree: string;
    major: string;
    school: string;
    graduationDate: string;
}

export interface ResumeData {
    id: number;
    name: string;
    email: string;
    phone?: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
}

export const mockResume: ResumeData[] = [
    {
        id: 1, 
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        summary: 'Front-End Developer with experience in React and TypeScript',
        experience: [
            {
                jobTitle: 'Front-End Developer',
                company: 'Tech Company',
                startDate: '2020-01-01',
                endDate: '2021-01-01',
                description: 'Developed web applications using React and TypeScript',
            },
        ],
        education: [
            {
                degree: 'Bachelor of Science',
                major: 'Computer Science',
                school: 'University of Computer Science',
                graduationDate: '2020-05-01',
            },
        ],
        skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    },
]