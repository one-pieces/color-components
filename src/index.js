import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { v4 as uuidV4 } from "uuid";

console.log("==============scehma", schema);

// 将 prosemirror-schema-list 和基本 schema 放在一起形成一个支持 list 的 schema
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

const view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector("#content")
    ),
    plugins: [
      new Plugin({
        appendTransaction(trs, oldState, state) {
          console.log("======trs", trs);
          const { doc, tr } = state;
          let _tr = tr;
          const contentBlockIdMap = [];
          doc.descendants((node, pos) => {
            const { type, attrs } = node;

            if (type.spec.contentBlock) {
              console.log("=======tr", node, pos);
              if (!attrs.id || contentBlockIdMap.includes(attrs.id)) {
                console.log("=======id", attrs.id);
                _tr = _tr.setNodeMarkup(pos, null, {
                  ...attrs,
                  id: `${uuidV4()}`,
                });
              } else {
                contentBlockIdMap.push(attrs.id);
              }
            }
          });
        },
      }),
    ],
  }),
});
