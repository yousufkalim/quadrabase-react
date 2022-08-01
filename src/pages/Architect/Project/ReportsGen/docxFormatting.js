import { Paragraph, TextRun, AlignmentType } from 'docx';

const l4Font = 16 * 2;
const l3Font = 14 * 2;
const l2Font = 12 * 2;
const l1Font = 11 * 2;
const l0Font = 10 * 2;
const ln1Font = 9 * 2;

const fontType = 'Calibri';

function docText(text, size, bold = false, font = fontType, center = false) {
  return new Paragraph({
    alignment: !center ? AlignmentType.START : AlignmentType.CENTER,
    children: text.split('\n').map((line) => new TextRun({ break: 1, text: line, size: size, bold: bold, font: font })),
  });
}

function l4Text(text) {
  return docText(text, l4Font, true);
}

function l3Text(text) {
  return docText(text, l3Font, true);
}

function l2Text(text) {
  return docText(text, l2Font, true);
}

function l1Text(text, bold = false) {
  return docText(text, l1Font, bold);
}

function l0Text(text, bold = false, center = false) {
  return docText(text, l0Font, bold, fontType, center);
}

function ln1Text(text, bold = false) {
  return docText(text, ln1Font, bold);
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
