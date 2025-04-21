import { Message, Option } from '../types';

export const getOptionsMenu = (): Option[] => [
  {
    id: 'syllabus',
    icon: '📘',
    label: 'Get Syllabus Info',
    description: 'Access NCERT/CBSE syllabus for your grade'
  },
  {
    id: 'exams',
    icon: '📅',
    label: 'Exam Tips & Schedule',
    description: 'Get exam preparation tips and schedule'
  },
  {
    id: 'homework',
    icon: '📝',
    label: 'Homework Help',
    description: 'Get help with NCERT textbook questions'
  },
  {
    id: 'resources',
    icon: '📚',
    label: 'Study Resources',
    description: 'Access NCERT books and study materials'
  }
];

const getGradeSpecificContent = (grade: number, topic: string) => {
  const gradeContent: Record<number, Record<string, string>> = {
    1: {
      math: 'Let\'s learn basic addition and subtraction with numbers 1-20',
      english: 'We\'ll practice basic vocabulary and simple sentences',
      science: 'Let\'s explore our surroundings and learn about plants and animals'
    },
    6: {
      math: 'We\'ll cover integers, fractions, decimals, and basic algebra',
      science: 'We\'ll study about food, materials, living organisms, and motion',
      social: 'Let\'s learn about ancient civilizations and geography'
    },
    9: {
      math: 'We\'ll cover quadratic equations, coordinate geometry, and trigonometry',
      science: 'We\'ll study atoms, cells, force and laws of motion',
      social: 'We\'ll explore modern history, economics, and political science'
    },
    12: {
      math: 'We\'ll cover calculus, vectors, and probability',
      physics: 'We\'ll study electromagnetism, modern physics, and semiconductors',
      chemistry: 'We\'ll cover organic chemistry, electrochemistry, and coordination compounds'
    }
  };

  // Find the closest grade level for content
  const grades = Object.keys(gradeContent).map(Number);
  const closestGrade = grades.reduce((prev, curr) => 
    Math.abs(curr - grade) < Math.abs(prev - grade) ? curr : prev
  );

  return gradeContent[closestGrade][topic.toLowerCase()] || 
    'Let me help you with your NCERT textbook questions. Which chapter are you studying?';
};

export const getInitialMessages = (): Message[] => [
  {
    id: '1',
    content: '👋 Welcome to EduBot! I\'m your CBSE curriculum-aligned learning assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
    options: getOptionsMenu()
  }
];

export const getBotResponse = (input: string, grade: number = 1): { content: string; options?: Option[] } => {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('syllabus')) {
    return {
      content: `Here's your CBSE/NCERT syllabus for Grade ${grade}:\n\n` +
        '📚 Access your textbooks:\n' +
        '• NCERT Books: https://ncert.nic.in/textbook.php\n' +
        '• CBSE Syllabus: https://cbseacademic.nic.in/curriculum.html\n\n' +
        'Would you like help with a specific subject?',
      options: [
        {
          id: 'math',
          icon: '🔢',
          label: 'Mathematics',
          description: 'Get help with Math concepts'
        },
        {
          id: 'science',
          icon: '🔬',
          label: 'Science',
          description: 'Learn Science topics'
        },
        {
          id: 'social',
          icon: '🌏',
          label: 'Social Studies',
          description: 'Explore Social Studies'
        }
      ]
    };
  }

  if (lowerInput.includes('exam')) {
    return {
      content: '📅 Exam Preparation Tips:\n\n' +
        '1. Follow NCERT textbooks thoroughly\n' +
        '2. Practice with CBSE sample papers\n' +
        '3. Make chapter-wise notes\n' +
        '4. Solve previous year questions\n\n' +
        'Would you like sample papers or chapter-wise questions?'
    };
  }

  if (lowerInput.includes('homework') || lowerInput.includes('doubt')) {
    return {
      content: getGradeSpecificContent(grade, 'math') + '\n\n' +
        'Which subject do you need help with?',
      options: [
        {
          id: 'math_help',
          icon: '📐',
          label: 'Mathematics',
          description: 'Get help with Math problems'
        },
        {
          id: 'science_help',
          icon: '🧪',
          label: 'Science',
          description: 'Get help with Science concepts'
        }
      ]
    };
  }

  if (lowerInput.includes('resource')) {
    return {
      content: '📚 CBSE/NCERT Resources:\n\n' +
        '• NCERT Official: https://ncert.nic.in\n' +
        '• CBSE Academic: https://cbseacademic.nic.in\n' +
        '• Digital Learning: https://diksha.gov.in\n' +
        '• Sample Papers: https://cbse.gov.in/sample-papers'
    };
  }

  // Default response
  return {
    content: 'I\'m here to help with your NCERT/CBSE curriculum! Choose an option below or ask me a question about your studies.',
    options: getOptionsMenu()
  };
};