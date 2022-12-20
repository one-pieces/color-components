const PState = require("prosemirror-state");
const PSchema = require("prosemirror-schema-basic");
const PModel = require("prosemirror-model");
const { doc } = require("prettier");

const NodeType = PModel.NodeType;
const Node = PModel.Node;
let count = 0;

NodeType.prototype.createOrigin = NodeType.prototype.create;
NodeType.prototype.create = function newCreate(attrs, content, marks) {
  const copyAttrs = attrs ? { ...attrs } : {};
  copyAttrs.id = "random-id-1 " + ++count;
  console.log("invoking create", this.name, attrs && attrs.id);
  return this.createOrigin(copyAttrs, content, marks);
};

NodeType.prototype.createCheckedOrigin = NodeType.prototype.createChecked;
NodeType.prototype.createChecked = function newCreateChecked(
  attrs,
  content,
  marks
) {
  const copyAttrs = attrs ? { ...attrs } : {};
  copyAttrs.id = "random-id-2 " + ++count;
  console.log("invoking createChecked", this.name, attrs && attrs.id);
  return this.createCheckedOrigin(copyAttrs, content, marks);
};

NodeType.prototype.createAndFillOrigin = NodeType.prototype.createAndFill;
NodeType.prototype.createAndFill = function newCreateAndFill(
  attrs,
  content,
  marks
) {
  const copyAttrs = attrs ? { ...attrs } : {};
  copyAttrs.id = "random-id-3 " + ++count;
  console.log("invoking createAndFill", this.name, attrs && attrs.id);
  return this.createAndFillOrigin(copyAttrs, content, marks);
};

Node.prototype.copyOrigin = Node.prototype.copy;
Node.prototype.copy = function newCopy(content = null) {
  console.log("invoking copy", this.type.name, this.attrs && this.attrs.id);
  this.attrs.id = "copy-id " + ++count;
  return this.copyOrigin(content);
};

const { EditorState, Plugin } = PState;

const { nodes, marks } = PSchema;

let state = EditorState.create({
  schema: new PModel.Schema({
    nodes: {
      ...nodes,
      paragraph: {
        content: "inline*",
        group: "block",
        attrs: {
          id: { default: 11 },
        },
        parseDOM: [{ tag: "p" }],
        toDOM() {
          return ["p", 0];
        },
      },
    },
    marks,
  }),
  plugins: [
    new Plugin({
      appendTransaction(trs, oldState, state) {
        console.log(
          "=======0",
          trs,
          oldState.doc.toString(),
          state.doc.toString()
        );
        return state.tr.setSelection(
          new PState.TextSelection(state.doc.resolve(1))
        );
      },
    }),
    new Plugin({
      appendTransaction(trs, oldState, state) {
        console.log(
          "=======1",
          trs,
          oldState.doc.toString(),
          state.doc.toString()
        );
      },
    }),
  ],
});

let tr = state.tr;
tr.insertText("bar", 1);
// tr.insert(2, state.schema.nodes.code_block.create()).setMeta("insert");
state = state.apply(tr);

tr = state.tr;
tr.insert(2, state.schema.nodes.code_block.create());
state = state.apply(tr);

console.log("=====", JSON.stringify(state.doc.toJSON()));
console.log(state.doc.toString());

state.doc.descendants((node) => {
  console.log("===========node: ", node.type.name);
  break;
});
