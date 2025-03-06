// import { Extension } from '@tiptap/core';

// const FontSize = Extension.create({
//   name: 'fontSize',

//   addOptions() {
//     return {
//       types: ['textStyle'], // Specify the types where this extension can be applied
//     };
//   },

//   addAttributes() {
//     return {
//       fontSize: {
//         default: null,
//         parseHTML: (element) => element.style.fontSize || null,
//         renderHTML: (attributes) => {
//           if (!attributes.fontSize) {
//             return {};
//           }

//           return {
//             style: `font-size: ${attributes.fontSize}`,
//           };
//         },
//       },
//     };
//   },

//   addCommands() {
//     return {
//       setFontSize:
//         (fontSize: string) =>
//           ({ chain }) => {
//             return chain().setMark('textStyle', { fontSize }).run();
//           },
//       unsetFontSize:
//         () =>
//           ({ chain }) => {
//             return chain().setMark('textStyle', { fontSize: null }).run();
//           },
//     };
//   },
// });

// export default FontSize;

