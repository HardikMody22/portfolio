/* ==========================================================================
   data.js - THE ONLY FILE YOU NEED TO EDIT
   --------------------------------------------------------------------------
   Every section of the site renders from this object. Change a value, save,
   commit, push - GitHub Pages redeploys automatically.

   NOTE ON LINKEDIN SYNC: LinkedIn has no public profile API and actively
   blocks automated reads (it returns HTTP 999 to scrapers). No static site
   can legitimately auto-pull a LinkedIn profile. So this file is the sync
   point: when you change LinkedIn, mirror it here. One file, one edit.
   ========================================================================== */

const DATA = {
  // ---- Identity ----------------------------------------------------------
  name: "Hardik Mody",
  initials: "HM",

  // Portrait. Square image, 640x640 works well.
  // If this file is missing the hero falls back to an "HM" monogram.
  photo: "./avatar.jpg",

  role: "Technical Account Manager - Data Analytics & Generative AI",
  org: "Amazon Web Services",
  location: "United States · Remote",

  tagline:
    "I help enterprise customers turn complex cloud architecture into clear engineering outcomes - from packets and protocols to petabyte-scale analytics and production GenAI.",

  // ---- Links -------------------------------------------------------------
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/hardikmody22", icon: "in" },
    { label: "GitHub", url: "https://github.com/HardikMody22", icon: "gh" },
  ],

  // ---- Hero stats (numbers animate on load) ------------------------------
  stats: [
    { value: 10, suffix: "+", label: "Years in tech" },
    { value: 4, suffix: " yrs", label: "At AWS" },
    { value: 25, suffix: "+", label: "Certifications" },
    { value: 4, suffix: "K+", label: "LinkedIn followers" },
  ],

  // ---- About -------------------------------------------------------------
  about: [
    "I'm a Technical Account Manager at AWS focused on Data Analytics and Generative AI. I have a deep understanding of how the internet works and how data moves across it - from packets and protocols up to petabyte-scale analytics and production GenAI systems.",
    "Over the last decade I've moved from building and shipping software - Java, Node, Angular, Kubernetes, CI/CD - to advising enterprise customers on architecture, reliability, and cost at scale. I drive business reviews with senior leadership, lead incident and risk conversations, and build the operating procedures that keep things calm.",
    "I care about operational excellence, honest tradeoffs, and making complicated systems understandable to the people who have to run them.",
  ],

  // ---- Experience (grouped by company, like LinkedIn) --------------------
  experience: [
    {
      company: "Amazon Web Services (AWS)",
      zone: "dallas",
      url: "https://aws.amazon.com",
      meta: "Full-time · 4 yrs · United States",
      current: true,
      roles: [
        {
          title: "Technical Account Manager (Data Analytics and Generative AI)",
          short: "GAI",
          period: "Nov 2024 - Present",
          length: "1 yr 9 mos",
          location: "Remote",
          points: [
            "Lead the technical relationship for customers building data analytics and generative AI workloads on AWS.",
            "Advise on GenAI architecture, model selection, and cost-to-serve for production workloads.",
          ],
          skills: ["Amazon Q", "Amazon EKS", "Amazon Bedrock"],
        },
        {
          title: "Technical Account Manager (Strategic Industries)",
          short: "SI",
          period: "Mar 2024 - Nov 2024",
          length: "9 mos",
          location: "Remote",
          points: [
            "Supported strategic industry accounts across architecture, resilience, and operational readiness.",
            "Partnered with service teams to escalate and resolve high-impact customer issues.",
          ],
          skills: ["Software Management", "Amazon Q", "Amazon CodeWhisperer", "Amazon CDK", "Cloud Computing"],
        },
        {
          title: "Associate Technical Account Manager (Strategy)",
          short: "ATAM",
          period: "Aug 2022 - Mar 2024",
          length: "1 yr 8 mos",
          location: "United States",
          points: [
            "Crafted and drove strategies to accelerate customer adoption and use of AWS services.",
            "Drove discussions with senior leadership on incidents, tradeoffs, support, and risk management from the customer's point of view.",
            "Provided advocacy and strategic technical guidance to help plan and build solutions using best practices.",
            "Developed close relationships with customers to understand their business and technical needs.",
            "Proactively monitored infrastructure health to ensure smooth running of operations.",
            "Developed best-in-class standard operating procedures for smaller on-call events.",
            "Drove strategic, monthly, and quarterly business reviews to prioritize customer concerns.",
          ],
          skills: ["Kubernetes", "Cloud Computing", "AWS Lambda", "Amazon EKS", "RDS", "AWS"],
        },
      ],
    },
    {
      company: "Veryable",
      zone: "dallas",
      url: "https://www.veryableops.com",
      meta: "Full-time · 1 yr 5 mos · Texas, United States",
      roles: [
        {
          title: "Web Engineer",
          short: "WEB",
          period: "Feb 2021 - Jun 2022",
          length: "1 yr 5 mos",
          location: "Texas, United States",
          points: [
            "Implemented Holds on user/operator profiles to prevent permanent deletion of users.",
            "Added Single Sign-On with Facebook, Google, and Apple to ease onboarding.",
            "Introduced cache invalidation for multi-field queries to reduce latency.",
            "Managed session deletion to prevent duplicate entries.",
            "Added role-based security for internal users and codegen for easy code migration.",
            "Worked on Vault - a one-of-a-kind payments service for same-day payments.",
            "Developed and architected the message-feeds services.",
            "Implemented chaos engineering to improve infrastructure reliability.",
          ],
          skills: ["Kubernetes", "Git", "Node.js", "TypeScript", "MySQL", "Web Development", "Chaos Engineering"],
        },
      ],
    },
    {
      company: "Northeastern University",
      zone: "boston",
      url: "https://www.northeastern.edu",
      meta: "Boston, Massachusetts · 2 yrs 7 mos",
      roles: [
        {
          title: "Graduate Teaching Assistant",
          short: "TA",
          period: "Sep 2020 - Dec 2020",
          length: "4 mos",
          location: "College of Engineering, Boston, MA",
          points: ["Teaching assistant for the College of Engineering."],
          skills: [],
        },
        {
          title: "Building Supervisor",
          short: "BLDG",
          period: "Feb 2020 - Nov 2020",
          length: "10 mos",
          location: "Marino Center",
          points: [
            "Led a staff of more than 100 employees as supervisor/manager.",
            "Provisioned smooth functioning of the building and operations.",
            "Guided, trained, and mentored Operations Supervisors, Facility Assistants, and Fitness Consultants.",
            "Oversaw the customer service experience at University Recreation.",
            "Replaced legacy operating methods with a continuous-improvement agile model.",
          ],
          skills: ["Leadership", "Team Management"],
        },
        {
          title: "Operations Supervisor",
          short: "OPS",
          period: "Jan 2019 - Feb 2020",
          length: "1 yr 2 mos",
          location: "Greater Boston",
          points: [
            "Supervised a staff of 50 facility assistants for access control.",
            "Handled building emergencies and resolved operational issues quickly.",
            "Handled monetary transactions and inventory account keeping.",
          ],
          skills: ["Management", "Teamwork"],
        },
        {
          title: "Facility Assistant - Marino Center",
          short: "FA",
          period: "Sep 2018 - Jan 2019",
          length: "5 mos",
          location: "Boston, Massachusetts",
          points: [
            "Ran front-desk operations at the Marino Center gym facility.",
            "Supported patrons and enforced recreation centre rules and secure access.",
          ],
          skills: [],
        },
      ],
    },
    {
      company: "Nu School",
      zone: "boston",
      meta: "Internship · 2 mos · United States",
      roles: [
        {
          title: "Fellowship",
          short: "FEL",
          period: "Jul 2020 - Aug 2020",
          length: "2 mos",
          location: "United States",
          points: ["Summer fellowship focused on modern web development practices."],
          skills: ["Git", "HTML5", "JavaScript", "CSS"],
        },
      ],
    },
    {
      company: "TeraBiz",
      zone: "boston",
      meta: "Full-time · 8 mos · Acton, Massachusetts",
      roles: [
        {
          title: "Software Engineer",
          short: "SWE",
          period: "May 2019 - Dec 2019",
          length: "8 mos",
          location: "Acton, Massachusetts",
          points: [
            "Led a team of web and mobile developers migrating from a legacy waterfall system to modern CI/CD.",
            "Built a CI/CD pipeline with AWS CodeCommit, Jenkins, and EC2 across DEV, TEST, and PROD.",
            "Migrated the front-end from Angular 5 to Angular 8 with no library conflicts.",
            "Designed and configured MongoDB for stateless data with schema validation.",
            "Built a Node.js/Express backend and provisioned Redis caching for faster responses.",
            "Devised a chat feature using Socket.IO and RabbitMQ enabling B2B communication.",
            "Containerized the entire framework with Docker on a custom network.",
            "Built bulk data import with parsing and simultaneous DB writes - improved client efficiency by 400%.",
          ],
          skills: ["Git", "HTML5", "Angular", "Node.js", "MongoDB", "Redis", "Docker"],
        },
      ],
    },
    {
      company: "Tap Cube Studios",
      zone: "mumbai",
      meta: "Full-time · 6 mos · Mumbai Metropolitan Region",
      roles: [
        {
          title: "Junior Software Engineer",
          short: "JSE",
          period: "Dec 2016 - May 2017",
          length: "6 mos",
          location: "Mumbai Metropolitan Region",
          points: [
            "Built an application with Java, Spring Boot, microservices, and distributed systems in a Scrum environment for a major sports franchise.",
            "Used Spring MVC and Hibernate for client and financial database management.",
            "Integrated scalable backend, API, and microservices for mortgages and fraud tracking - saved 70% of workflow time.",
            "Applied client-side performance considerations with RESTful APIs, improving risk management by 30%.",
            "Implemented the LAN system for a new regional office, handling security and networking.",
            "Built internal tooling for deployment, testing, and security - increased output by 30%.",
          ],
          skills: ["Java", "Spring Boot", "Hibernate", "Microservices", "Git"],
        },
      ],
    },
    {
      company: "Vervali Systems Pvt Ltd",
      zone: "mumbai",
      url: "https://www.vervali.com",
      meta: "Full-time · 6 mos · Mumbai Metropolitan Region",
      roles: [
        {
          title: "Junior Cloud / Mobile Developer",
          short: "CLD",
          period: "Jul 2016 - Dec 2016",
          length: "6 mos",
          location: "Verticals: Localization, Database Integration",
          points: [
            "Deployed a Java / Spring Boot microservices application in a Scrum/Agile environment.",
            "Used Elasticsearch and Kibana dashboards to monitor and visualize API health checks.",
            "Integrated scalable backend and microservices with message queues and caching - saved 70% workflow time.",
            "Developed an Android application for tracking cash transactions.",
            "Built account keeping and transaction recording for small-scale organizations in 30 days.",
          ],
          skills: ["Java", "Spring Boot", "Elasticsearch", "Kibana", "Android", "Git"],
        },
      ],
    },
    {
      company: "Junk Minds",
      zone: "mumbai",
      meta: "4 mos · Mumbai, Maharashtra, India",
      roles: [
        {
          title: "Technical Author",
          short: "AUT",
          period: "Dec 2015 - Mar 2016",
          length: "4 mos",
          location: "Mumbai, India",
          points: [
            "Authored a book and tutored an online course with 9 in-depth lectures on Analog Electronics-2.",
            "Used slide recording and 3D animation to teach foundation subjects to students.",
          ],
          skills: ["Technical Writing", "Public Speaking"],
        },
      ],
    },
    {
      company: "Early roles",
      zone: "mumbai",
      meta: "Marketing, brand & research · 2015 - 2016",
      roles: [
        {
          title: "Event Manager Researcher - Prarambhan",
          short: "EVT",
          period: "Dec 2015 - Jan 2016",
          length: "2 mos",
          location: "Mumbai Metropolitan Region",
          points: ["Discovered client-side requirements for event management and onboarded clients."],
          skills: [],
        },
        {
          title: "Student Partner - Internshala",
          short: "SP",
          url: "https://internshala.com",
          period: "Oct 2015 - Jan 2016",
          length: "4 mos",
          location: "Mumbai Metropolitan Region",
          points: ["Promoted Internshala on campus and planned digital marketing strategies to grow subscriptions."],
          skills: [],
        },
        {
          title: "Brand Manager - Intern Theory Career Solutions LLP",
          short: "BM",
          period: "Nov 2015 - Dec 2015",
          length: "2 mos",
          location: "Mumbai",
          points: [
            "Brand management and customer acquisition; led a team of 4 on marketing for educational purposes.",
          ],
          skills: [],
        },
      ],
    },
  ],

  // ---- Skills (filterable) ----------------------------------------------
  skills: [
    {
      group: "Cloud & AWS",
      items: ["AWS", "Amazon EKS", "AWS Lambda", "EC2", "S3", "RDS", "VPC & Networking", "CloudFormation", "Route 53", "Amazon CDK", "Cloud Computing"],
    },
    {
      group: "AI & GenAI",
      items: ["Generative AI", "Amazon Bedrock", "AWS SageMaker", "Amazon Q", "Machine Learning", "RAG", "Prompt Engineering", "Fine Tuning", "MLOps", "GenAI Architecture"],
    },
    {
      group: "Platform & DevOps",
      items: ["Kubernetes", "Docker", "Terraform", "CI/CD", "Jenkins", "CircleCI", "Git", "Chaos Engineering", "Site Reliability Engineering", "Observability"],
    },
    {
      group: "Languages & Web",
      items: ["Java", "JavaScript", "TypeScript", "Node.js", "Angular", "HTML5", "CSS", "ES6", "Java EE", "Django", "C", "Embedded C", "MATLAB"],
    },
    {
      group: "Data",
      items: ["MySQL", "MongoDB", "Redis", "Elasticsearch", "Kibana", "Data Management", "Data Quality", "Big Data"],
    },
    {
      group: "Networking",
      items: ["TCP/IP", "OSI Model", "Computer Networks", "Wireless Networking", "Optical Networks", "FTP", "Apache", "Windows Server"],
    },
    {
      group: "Leadership",
      items: ["Leadership", "Team Management", "Cross-functional Leadership", "Engineering Management", "Technical Consultation", "Public Speaking", "Teamwork"],
    },
  ],

  // ---- Projects ----------------------------------------------------------
  projects: [
    {
      title: "Smart Plug & Home Utilities",
      period: "Jul 2017",
      org: "D. J. Sanghvi College of Engineering",
      blurb:
        "Bridged traditional home electrical appliances with automation. Covered home utilities, security, surveillance, and sensing of optimal temperature and humidity.",
      tags: ["IoT", "Embedded C", "Automation"],
    },
    {
      title: "Wireless LAN - FTP Protocol Advanced",
      period: "Jan 2017",
      org: "D. J. Sanghvi College of Engineering",
      blurb:
        "Local server on the college network with a dynamic course-content site, request database, live conference streaming, and an MIT App Inventor app - raised student involvement by 40%. Hardened against SQL injection.",
      tags: ["FTP", "Networking", "Web", "Security"],
    },
    {
      title: "BeatPlay",
      period: "Sep - Dec 2018",
      org: "Northeastern University",
      blurb:
        "Web app giving users a console to create music. Angular front end, Node.js backend, Passport.js auth and session management, MongoDB CRUD.",
      tags: ["Angular", "Node.js", "MongoDB"],
    },
    {
      title: "BestPharm Medicine Distributor",
      period: "Sep - Dec 2018",
      org: "Northeastern University",
      blurb:
        "Java Swing application modelling a 5-stage national medical distribution ecosystem, with patient medicine donation work queues, dual databases, and JFreeChart analytics.",
      tags: ["Java", "Swing", "Data Viz"],
    },
    {
      title: "Interactive To-Do List",
      period: "Oct - Dec 2018",
      org: "Northeastern University",
      blurb:
        "Web app with event-listener driven add/delete, async item loading via HTTP client and Promises, built with ES6, TypeScript, and SCSS.",
      tags: ["TypeScript", "ES6", "SCSS"],
    },
    {
      title: "Airline Booking System",
      period: "Oct - Nov 2018",
      org: "Northeastern University",
      blurb:
        "Air ticket booking ecosystem in Java with a Swing UI, demonstrating abstraction, interfaces, exception handling, regex, and clean data parsing.",
      tags: ["Java", "Swing", "OOP"],
    },
  ],

  // ---- Certifications ----------------------------------------------------
  certifications: [
    { name: "AWS Certified AI Practitioner", issuer: "Amazon", date: "Jun 2026", note: "Expires Jun 2029", featured: true },
    { name: "Well-Architected Proficient", issuer: "AWS", date: "Feb 2026", featured: true },
    { name: "AWS Certified Solutions Architect - Professional", issuer: "AWS", date: "Nov 2025", note: "Expires Nov 2028", featured: true },
    { name: "AWS Generative AI Accreditation - Intermediate", issuer: "AWS", date: "Sep 2025", featured: true },
    { name: "AWS Generative AI Foundation", issuer: "AWS", date: "Sep 2025" },
    { name: "Gen AI & LLM on Databricks", issuer: "Databricks", date: "Jun 2025", note: "Expires Jun 2027", featured: true },
    { name: "Platform Architect", issuer: "Databricks", date: "May 2025", note: "Expires May 2027" },
    { name: "AWS Partner: Cloud Economics Essentials", issuer: "AWS", date: "Oct 2024" },
    { name: "AWS Certified Solutions Architect - Associate", issuer: "AWS", date: "Dec 2022" },
    { name: "AWS Certified Cloud Practitioner", issuer: "AWS", date: "Sep 2022" },
    { name: "Subnets, Gateways and Route Tables", issuer: "AWS", date: "Jun 2022" },
    { name: "Introduction to Amazon VPC", issuer: "AWS", date: "Jun 2022" },
    { name: "Understanding CIDR Notation", issuer: "AWS", date: "Jun 2022" },
    { name: "Gremlin Certified Chaos Engineer", issuer: "Gremlin", date: "Sep 2021", featured: true },
    { name: "M.S. Information Systems", issuer: "Northeastern University", date: "Dec 2020" },
    { name: "NU School Summer Fellowship", issuer: "Nu School", date: "Jul 2020" },
    { name: "Learning Terraform", issuer: "LinkedIn", date: "Jan 2020" },
    { name: "Learning Django", issuer: "LinkedIn", date: "Jan 2020" },
    { name: "Docker for Java Developers", issuer: "LinkedIn", date: "Jan 2020" },
    { name: "AWS SA Associate: Cloud Services Overview", issuer: "LinkedIn", date: "Mar 2020" },
    { name: "Learning Koa", issuer: "Lynda.com", date: "Jul 2019" },
    { name: "Blockchain Basics", issuer: "Lynda.com", date: "Apr 2019" },
    { name: "Java: Generic Classes", issuer: "Lynda.com", date: "Feb 2019" },
    { name: "CPR / AED / First Aid", issuer: "American Red Cross", date: "Feb 2019" },
    { name: "Introduction to Modern Application Development", issuer: "NPTEL", date: "-" },
  ],

  // ---- Education ---------------------------------------------------------
  education: [
    {
      school: "Northeastern University",
      degree: "M.S. Information Systems - Computer Software Engineering",
      period: "2018 - 2020",
      courses: [
        "Application Engineering & Development (Java)",
        "Web Design & UX (Angular, Node, Express, MongoDB)",
        "Program Structures & Algorithms (Java)",
        "Web Tools & Development (Spring, Hibernate, MySQL)",
        "DevOps Tools & Methods (AWS, Azure, Docker, Kubernetes)",
        "Network Structures & Cloud Computing (EC2, RDS, S3, Lambda, CloudFormation, IAM)",
        "Big Data Applications (Elasticsearch, Kibana, Redis, Spring Boot)",
      ],
    },
    {
      school: "Dwarkadas J. Sanghvi College of Engineering",
      degree: "B.E. Electronics and Telecommunication",
      period: "2014 - 2018",
      activities: ["Trinity Marketing Team", "DJS Racing Marketing Team", "NSS", "IETE-SF Core Committee"],
      courses: [
        "Telecom Network Management",
        "Computer Networks & Communication",
        "Digital & Satellite Communication",
        "RF and Antenna",
        "Wireless & Optical Networks",
        "Operating Systems",
        "Object Oriented Programming (Java)",
        "Microcontrollers & Microprocessors",
        "Control Systems",
      ],
    },
  ],

  /* ---- Career as infrastructure -------------------------------------------
     The architecture diagram nests like the real thing:

       vpc  ->  subnet (zone)  ->  cluster (company)  ->  node (role)  ->  container (skill)

     Everything is derived from `experience` above. A company's `zone` picks its
     subnet, `short` sets the node label, and `skills` become its containers.   */
  vpcs: [
    {
      name: "vpc/hardik-us",
      cidr: "10.0.0.0/16",
      meta: "region: us-east-1  |  igw: attached  |  flow logs: on",
      subnets: [
        {
          zone: "dallas",
          id: "subnet/dallas-1b",
          cidr: "10.0.2.0/24",
          label: "Dallas, Texas  |  2021 - now",
        },
        {
          zone: "boston",
          id: "subnet/boston-1a",
          cidr: "10.0.1.0/24",
          label: "Boston and Acton, Massachusetts  |  2018 - 2020",
        },
      ],
    },
    {
      name: "vpc/hardik-india",
      cidr: "10.1.0.0/16",
      meta: "region: ap-south-1  |  igw: attached",
      subnets: [
        {
          zone: "mumbai",
          id: "subnet/mumbai-1a",
          cidr: "10.1.1.0/24",
          label: "Mumbai, Maharashtra  |  2015 - 2017",
        },
      ],
    },
  ],

  // one shared control plane strip, rendered above the VPCs
  controlPlane: [
    { k: "kube-apiserver", v: "healthy" },
    { k: "kube-scheduler", v: "idle" },
    { k: "etcd", v: "0 nodes" },
  ],
  /* ---- Inference pipeline -------------------------------------------------
     Grounded answers streamed token by token through a mock RAG pipeline.
     Keep these factual, they are the first thing a recruiter actually reads.
     `chunks` is cosmetic, it just drives the "chunks retrieved" readout.      */
  aiQA: [
    {
      q: "what does hardik work on?",
      a: "Data analytics and generative AI at AWS. He advises enterprise customers on architecture, reliability and cost for production GenAI workloads.",
      chunks: 4,
    },
    {
      q: "where is he strongest?",
      a: "Amazon EKS and Kubernetes, GenAI architecture on Bedrock, and resilience plus cost optimization at enterprise scale.",
      chunks: 6,
    },
    {
      q: "what shape is his career?",
      a: "Ten years. Engineer first, Java, Node, Angular and Kubernetes, then four years advising AWS enterprise customers as a Technical Account Manager.",
      chunks: 5,
    },
    {
      q: "can he run a migration?",
      a: "Yes. He led a legacy waterfall to CI/CD migration at TeraBiz, and drives migration and upgrade planning for AWS customers today.",
      chunks: 3,
    },
    {
      q: "does he actually know kubernetes?",
      a: "Amazon EKS across four AWS roles, and Kubernetes in production at Veryable, where he also added chaos engineering to prove the platform could take a hit.",
      chunks: 7,
    },
    {
      q: "how deep is the generative ai work?",
      a: "AWS Certified AI Practitioner, GenAI Accreditation Intermediate, and Gen AI plus LLM on Databricks. Day to day that means Bedrock, RAG design and model selection.",
      chunks: 8,
    },
    {
      q: "how does he handle incidents?",
      a: "He runs incident and risk conversations with senior leadership, and wrote the standard operating procedures his team uses for on-call events.",
      chunks: 4,
    },
    {
      q: "has he led people?",
      a: "Yes. He supervised over one hundred staff as Building Supervisor at Northeastern, and led developer teams at TeraBiz and Tap Cube Studios.",
      chunks: 5,
    },
    {
      q: "what did he study?",
      a: "A Masters in Information Systems at Northeastern from 2018 to 2020, after a BE in Electronics and Telecommunication at DJ Sanghvi in Mumbai.",
      chunks: 3,
    },
    {
      q: "is he still hands on?",
      a: "He shipped Java, Spring Boot, Node, Angular, MongoDB, Redis, Docker and CI/CD pipelines for six years. That depth now shapes the advice rather than the commits.",
      chunks: 6,
    },
    {
      q: "what about cost optimization?",
      a: "AWS Partner Cloud Economics Essentials certified, and he runs cost and resilience optimization engagements for enterprise accounts.",
      chunks: 4,
    },
    {
      q: "how many certifications does he hold?",
      a: "Twenty five, including Solutions Architect Professional, AI Practitioner, Well-Architected Proficient and Gremlin Certified Chaos Engineer.",
      chunks: 9,
    },
    {
      q: "why should we talk to him?",
      a: "He translates between engineers and executives. Deep enough to debug your cluster, clear enough to explain the tradeoff to your CTO in one sentence.",
      chunks: 5,
    },
  ],

  /* ---- Education as an eval suite -----------------------------------------
     Each stage of education is an eval case: what was selected, the assertions
     it satisfied, and the candidates that were not selected. `candidates` is
     the genuine option space at each stage, not a claim about what was
     personally deliberated. Delete a `candidates` array to hide that row.     */
  evalsTree: {
    suite: "evals/hardik-education",
    meta: "4 cases  |  20 years  |  deterministic",
    cases: [
      {
        id: "eval/foundation",
        selected: "Swami Vivekanand International School",
        meta: "SSC board  |  Kandivali, Mumbai",
        detail: "Schooling through Std X",
        url: "https://svischool.com",
        assertions: ["fundamentals", "study discipline"],
        candidates: ["State board", "CBSE"],
        score: 1.0,
      },
      {
        id: "eval/stream-selection",
        selected: "Shri T. P. Bhatia Junior College of Science",
        meta: "HSC Science  |  Kandivali, Mumbai",
        detail: "Physics, Chemistry, Maths, Electronics",
        url: "https://www.tpbhatiacollege.com",
        assertions: ["quantitative reasoning", "first exposure to electronics"],
        candidates: ["Commerce", "Arts"],
        score: 1.0,
      },
      {
        id: "eval/discipline-selection",
        selected: "Dwarkadas J. Sanghvi College of Engineering",
        meta: "BE Electronics and Telecommunication  |  2014 - 2018",
        detail: "Networks, wireless, optical, microcontrollers, OOP",
        url: "https://www.djsce.ac.in",
        assertions: ["how the internet actually works", "systems thinking"],
        candidates: ["Computer Engineering", "Mechanical"],
        score: 0.95,
      },
      {
        id: "eval/specialisation",
        selected: "Northeastern University",
        meta: "MS Information Systems  |  2018 - 2020",
        detail: "Cloud, DevOps, distributed systems, big data",
        url: "https://www.northeastern.edu",
        assertions: ["cloud architecture", "production engineering"],
        candidates: ["Straight to industry"],
        score: 1.0,
      },
    ],
    verdict: {
      label: "Cloud and Generative AI at AWS",
      meta: "aggregate score across 4 cases",
      score: 0.99,
    },
  },

  /* ---- Contact -------------------------------------------------------------
     The hero badge is a mailto link. `body` lines are joined with newlines and
     URL encoded, so the recruiter's mail client opens with the form ready.    */
  contact: {
    email: "hardik.mody22@gmail.com",
    label: "Open to interesting opportunities",
    subject: "Opportunity for Hardik Mody",
    body: [
      "Hey Hardik,",
      "",
      "My name is ______ and I visited your profile. I would like to approach you",
      "about the following role.",
      "",
      "Role:",
      "Company:",
      "Location:",
      "Expected base comp:",
      "Responsibilities:",
      "",
      "Thanks,",
      "",
    ],
  },

  footerNote: "Made with love and AI",
};
