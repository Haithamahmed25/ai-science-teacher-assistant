import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Packer, BorderStyle } from 'docx';

// Function to generate lesson plan document
export const generateLessonPlanDoc = (lessonPlan: any, includeArabic: boolean = false, arabicContent?: any) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Lesson Plan",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          
          // Objectives
          new Paragraph({
            text: "Objectives",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.objectives,
          }),
          new Paragraph({
            text: `Estimated Time: ${lessonPlan.estimatedTime} minutes`,
            spacing: {
              after: 200,
            },
          }),
          
          // NGSS Alignment
          new Paragraph({
            text: "NGSS Alignment",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.ngssAlignment || "N/A",
            spacing: {
              after: 200,
            },
          }),
          
          // Warm-Up
          new Paragraph({
            text: "Warm-Up",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.warmUp,
            spacing: {
              after: 200,
            },
          }),
          
          // Explanation
          new Paragraph({
            text: "Explanation",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.explanation,
            spacing: {
              after: 200,
            },
          }),
          
          // Student Activity
          new Paragraph({
            text: "Student Activity",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.studentActivity,
            spacing: {
              after: 200,
            },
          }),
          
          // Closure
          new Paragraph({
            text: "Closure",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.closure,
            spacing: {
              after: 200,
            },
          }),
          
          // Homework
          new Paragraph({
            text: "Homework",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: lessonPlan.homework,
            spacing: {
              after: 200,
            },
          }),
        ],
      },
    ],
  });

  // Add Arabic content if requested
  if (includeArabic && arabicContent) {
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [new PageBreak()],
        }),
        new Paragraph({
          text: "خطة الدرس",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          bidirectional: true,
        }),
        
        // Objectives in Arabic
        new Paragraph({
          text: "الأهداف",
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
        }),
        new Paragraph({
          text: arabicContent.objectives,
          bidirectional: true,
        }),
        new Paragraph({
          text: `الوقت المقدر: ${lessonPlan.estimatedTime} دقيقة`,
          spacing: {
            after: 200,
          },
          bidirectional: true,
        }),
        
        // Warm-Up in Arabic
        new Paragraph({
          text: "التهيئة",
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
        }),
        new Paragraph({
          text: arabicContent.warmUp,
          spacing: {
            after: 200,
          },
          bidirectional: true,
        }),
        
        // Explanation in Arabic
        new Paragraph({
          text: "الشرح",
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
        }),
        new Paragraph({
          text: arabicContent.explanation,
          spacing: {
            after: 200,
          },
          bidirectional: true,
        }),
        
        // Student Activity in Arabic
        new Paragraph({
          text: "نشاط الطلاب",
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
        }),
        new Paragraph({
          text: arabicContent.studentActivity,
          spacing: {
            after: 200,
          },
          bidirectional: true,
        }),
        
        // Closure in Arabic
        new Paragraph({
          text: "الخاتمة",
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
        }),
        new Paragraph({
          text: arabicContent.closure,
          spacing: {
            after: 200,
          },
          bidirectional: true,
        }),
        
        // Homework in Arabic
        new Paragraph({
          text: "الواجب المنزلي",
          heading: HeadingLevel.HEADING_2,
          bidirectional: true,
        }),
        new Paragraph({
          text: arabicContent.homework,
          spacing: {
            after: 200,
          },
          bidirectional: true,
        }),
      ],
    });
  }

  return doc;
};

// Function to generate assessment document
export const generateAssessmentDoc = (assessment: any, includeArabic: boolean = false, arabicContent?: any) => {
  const conceptualQuestions = assessment.conceptual.map((item: any, index: number) => [
    new Paragraph({
      text: `Question ${index + 1}: ${item.question}`,
      heading: HeadingLevel.HEADING_3,
      spacing: {
        before: 200,
      },
    }),
    new Paragraph({
      text: `Answer: ${item.answer}`,
      spacing: {
        after: 200,
      },
    }),
  ]).flat();

  const multipleChoiceQuestions = assessment.multipleChoice.map((item: any, index: number) => [
    new Paragraph({
      text: `Question ${index + 1}: ${item.question}`,
      heading: HeadingLevel.HEADING_3,
      spacing: {
        before: 200,
      },
    }),
    ...item.options.map((option: string, optIndex: number) => 
      new Paragraph({
        text: `${String.fromCharCode(65 + optIndex)}. ${option}${option === item.answer ? ' ✓' : ''}`,
        indent: {
          left: 720, // 0.5 inches in twips
        },
      })
    ),
    new Paragraph({
      text: `Correct Answer: ${item.answer}`,
      spacing: {
        after: 200,
      },
    }),
  ]).flat();

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Assessment Questions",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          
          // Conceptual Questions
          new Paragraph({
            text: "Conceptual Questions",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200,
            },
          }),
          ...conceptualQuestions,
          
          // Multiple Choice Questions
          new Paragraph({
            text: "Multiple-Choice Questions",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200,
              before: 400,
            },
          }),
          ...multipleChoiceQuestions,
        ],
      },
    ],
  });

  // Add Arabic content if requested
  if (includeArabic && arabicContent) {
    // Implementation for Arabic assessment would go here
    // Similar structure to the English version but with RTL text
  }

  return doc;
};

// Function to generate homework document
export const generateHomeworkDoc = (homework: any, level: 'basic' | 'core' | 'advanced', includeArabic: boolean = false, arabicContent?: any) => {
  const questions = homework[level].map((item: any, index: number) => [
    new Paragraph({
      text: `Question ${index + 1}: ${item.question}`,
      heading: HeadingLevel.HEADING_3,
      spacing: {
        before: 200,
      },
    }),
    ...item.options.map((option: string, optIndex: number) => 
      new Paragraph({
        text: `${String.fromCharCode(65 + optIndex)}. ${option}`,
        indent: {
          left: 720, // 0.5 inches in twips
        },
      })
    ),
    new Paragraph({
      spacing: {
        after: 200,
      },
    }),
  ]).flat();

  const answers = homework[level].map((item: any, index: number) => 
    new Paragraph({
      text: `Question ${index + 1}: ${item.answer}`,
    })
  );

  const levelTitle = level.charAt(0).toUpperCase() + level.slice(1);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `${levelTitle} Homework Questions`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          
          // Questions
          ...questions,
          
          // Page break before answers
          new Paragraph({
            children: [new PageBreak()],
          }),
          
          // Answer Key
          new Paragraph({
            text: "Answer Key",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          ...answers,
        ],
      },
    ],
  });

  // Add Arabic content if requested
  if (includeArabic && arabicContent) {
    // Implementation for Arabic homework would go here
    // Similar structure to the English version but with RTL text
  }

  return doc;
};

// Helper function to save document as blob
export const saveDocumentAsBlob = async (doc: Document) => {
  return await Packer.toBlob(doc);
};

// Helper function to download document
export const downloadDocument = async (doc: Document, fileName: string) => {
  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
