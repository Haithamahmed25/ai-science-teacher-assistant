import { Document, Paragraph, HeadingLevel, AlignmentType, PageBreak, Packer } from 'docx';

interface LessonPlan {
  objectives: string;
  estimatedTime: number;
  ngssAlignment?: string;
  warmUp: string;
  explanation: string;
  studentActivity: string;
  closure: string;
  homework: string;
}

interface ArabicLessonPlan {
  objectives: string;
  warmUp: string;
  explanation: string;
  studentActivity: string;
  closure: string;
  homework: string;
}

interface Question {
  question: string;
  answer: string;
  options: string[];
}

export const generateLessonPlanDoc = (lessonPlan: LessonPlan, includeArabic = false, arabicContent?: ArabicLessonPlan) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: 'Lesson Plan', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
          new Paragraph({ text: 'Objectives', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.objectives }),
          new Paragraph({ text: `Estimated Time: ${lessonPlan.estimatedTime} minutes` }),
          new Paragraph({ text: 'NGSS Alignment', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.ngssAlignment || 'N/A' }),
          new Paragraph({ text: 'Warm-Up', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.warmUp }),
          new Paragraph({ text: 'Explanation', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.explanation }),
          new Paragraph({ text: 'Student Activity', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.studentActivity }),
          new Paragraph({ text: 'Closure', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.closure }),
          new Paragraph({ text: 'Homework', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: lessonPlan.homework }),
        ],
      },
    ],
  });

  if (includeArabic && arabicContent) {
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({ text: 'خطة الدرس', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: 'الأهداف', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: arabicContent.objectives }),
        new Paragraph({ text: `الوقت المقدر: ${lessonPlan.estimatedTime} دقيقة` }),
        new Paragraph({ text: 'التهيئة', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: arabicContent.warmUp }),
        new Paragraph({ text: 'الشرح', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: arabicContent.explanation }),
        new Paragraph({ text: 'نشاط الطلاب', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: arabicContent.studentActivity }),
        new Paragraph({ text: 'الخاتمة', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: arabicContent.closure }),
        new Paragraph({ text: 'الواجب المنزلي', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: arabicContent.homework }),
      ],
    });
  }

  return doc;
};

export const saveDocumentAsBlob = async (doc: Document) => {
  return await Packer.toBlob(doc);
};

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
