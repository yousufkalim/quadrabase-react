import { Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

const l4Font = 16 * 2;
const l3Font = 14 * 2;
const l2Font = 12 * 2;
const l1Font = 11 * 2;
const l0Font = 10 * 2;
const ln1Font = 9 * 2;

const fontType = 'Calibri';

function docText({ text, linebreaks, size, heading, bold = false, font = fontType, center = false }) {
  return new Paragraph({
    alignment: !center ? AlignmentType.START : AlignmentType.CENTER,
    children: text
      .split('\n')
      .map((line) => new TextRun({ text: line, break: linebreaks, size: size, bold: bold, font: font, color: '000000' })),
    heading: heading ?? null,
  });
}

function l4Text(text, linebreaks) {
  return docText({ text: text, linebreaks: linebreaks, size: l4Font, heading: HeadingLevel.HEADING_1, bold: true });
}

function l3Text(text, linebreaks) {
  return docText({ text: text, linebreaks: linebreaks, size: l3Font, heading: HeadingLevel.HEADING_2, bold: true });
}

function l2Text(text, linebreaks) {
  return docText({ text: text, linebreaks: linebreaks, size: l2Font, heading: HeadingLevel.HEADING_3, bold: true });
}

function l1Text(text, bold = false, linebreaks) {
  return docText({ text: text, linebreaks: linebreaks, size: l1Font, bold: bold });
}

function l0Text(text, bold = false, center = false, linebreaks) {
  return docText({ text: text, linebreaks: linebreaks, size: l0Font, bold: bold, font: fontType, center: center });
}

function ln1Text(text, bold = false, linebreaks) {
  return docText({ text: text, linebreaks: linebreaks, size: ln1Font, bold: bold });
}

function lineBreak() {
  return new Paragraph({
    text: '',
  });
}

export {
  l4Font,
  l3Font,
  l2Font,
  l1Font,
  l0Font,
  ln1Font,
  fontType,
  docText,
  l4Text,
  l3Text,
  l2Text,
  l1Text,
  l0Text,
  ln1Text,
  lineBreak,
};
