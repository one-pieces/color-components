<script setup lang="ts">
import { onMounted } from 'vue'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import type { NodeSpec } from 'prosemirror-model'
import { Schema, DOMParser, NodeType, Node } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
// import { addListNodes } from "prosemirror-schema-list";
import { v4 as uuidV4 } from 'uuid'

const _create = NodeType.prototype.create
NodeType.prototype.create = function (attrs, content, marks) {
  const _attrs = attrs || {}
  _attrs.id = uuidV4()
  console.log('==========nodetype', _attrs, this.attrs, this)
  return _create.call(this, _attrs, content, marks)
}
const _createChecked = NodeType.prototype.createChecked
NodeType.prototype.createChecked = function (attrs, content, marks) {
  const _attrs = attrs || {}
  _attrs.id = 'createChecked'
  console.log('==========createChecked')
  return _createChecked.call(this, _attrs, content, marks)
}
const _createAndFill = NodeType.prototype.createAndFill
NodeType.prototype.createAndFill = function (attrs, content, marks) {
  const _attrs = attrs || {}
  _attrs.id = 'createAndFill'
  console.log('==========createAndFill')
  return _createAndFill.call(this, _attrs, content, marks)
}

// const _nodeConstructor = Node.prototype.constructor;
console.log('=========node', Node.prototype)
// Node.prototype.constructor = function (type, attrs, content?, marks) {
//   attrs.id = "node";
//   const con = _nodeConstructor.call(this, type, attrs, content, marks);
//   console.log("========con", con, this);
// };

const _nodeConstructor = Node.prototype.copy
console.log('=========node', Node.prototype, Node)
Node.prototype.copy = function (content) {
  const newNode = _nodeConstructor.call(this, content)
  newNode.attrs.id = uuidV4()
  console.log('========copy', newNode.attrs, newNode)
  return newNode
}

const paragraph: NodeSpec = {
  attrs: {
    indent: { default: 0 },
    align: { default: 'left' },
    dataDiffId: { default: null },
    id: { default: null },
  },
  content: 'inline*',
  group: 'block',
  contentBlock: true,
  parseDOM: [
    {
      tag: 'p',
      preserveWhitespace: 'full',
      getAttrs: (dom) => {
        return {
          id: dom.getAttribute('data-id'),
        }
      },
    },
  ],
  toDOM(node) {
    const { id } = node.attrs
    console.log('========id', id)
    const attrs = {} as Record<string, any>
    attrs['data-id'] = id
    return ['p', attrs, 0]
  },
}

const status: NodeSpec = {
  group: 'inline',
  content: 'text*',
  inline: true,
  contentBlock: true,
  attrs: {
    id: { default: null },
  },
  parseDOM: [
    {
      tag: 'span[class~="ct-status"]',
      getAttrs: (dom: HTMLElement) => {
        console.log('===========parse', dom)
        return {
          id: dom.getAttribute('data-id') || uuidV4(),
        }
      },
    },
  ],
  toDOM(node) {
    const { id } = node.attrs
    console.log('===========toDOM', node.attrs)
    const nodeAttrs = {
      class: 'ct-status',
      'data-id': id || uuidV4(),
    }

    return ['span', nodeAttrs, 0]
  },
}

let view

onMounted(() => {
  const mySchema = new Schema({
    nodes: schema.spec.nodes
      .addToEnd('status', status)
      .addToEnd('paragraph', paragraph),
    marks: schema.spec.marks,
  })

  view = new EditorView(document.querySelector('#editor'), {
    state: EditorState.create({
      doc: DOMParser.fromSchema(mySchema).parse(
        document.querySelector('#content')
      ),
      plugins: [
        keymap(baseKeymap),
        new Plugin({
          // keys: () => baseKeymap,
          filterTransaction(tr, state) {
            console.log(
              '=============filterTransaction',
              tr,
              state,
              tr.getMeta('uiEvent')
            )
            Node.uiEvent = tr.getMeta('uiEvent')
            return true
          },
          appendTransaction(trs) {
            console.log('=======o', trs)
          },
          // appendTransaction(trs, oldState, state) {
          //   console.log("======trs", trs);
          //   const { doc, tr } = state;
          //   let _tr = tr;
          //   const contentBlockIdMap: string[] = [];
          //   doc.descendants((node, pos) => {
          //     const { type, attrs } = node;
          //     if (type.spec.contentBlock) {
          //       console.log("=======tr", node, pos);
          //       if (!attrs.id || contentBlockIdMap.includes(attrs.id)) {
          //         console.log("=======id", attrs.id);
          //         _tr = _tr.setNodeMarkup(pos, undefined, {
          //           ...attrs,
          //           id: `${uuidV4()}`,
          //         });
          //       } else {
          //         contentBlockIdMap.push(attrs.id);
          //       }
          //     }
          //   });
          //   return _tr;
          // },
        }),
      ],
    }),
  })
  console.log('===========doc', view)
})

const insert = () => {
  const { selection, schema, tr } = view.state
  const { from } = selection
  console.log('===========ppp', schema)
  const node = schema.nodes.paragraph.create({}, schema.text('======'))
  tr.replaceWith(from, from, node)
  view.dispatch(tr)
  view.focus()

  console.log('===========docppp', view)
}
</script>

<template>
  <ol>
    <ol>
      <li>dda</li>
    </ol>
  </ol>
  <button style="width: 100px; height: 50px" @click="insert">insert</button>
  <!-- <iframe src="https://km.sankuai.com/collabpage/1344544286"></iframe>
  <iframe src="https://km.sankuai.com/collabpage/1361651192"></iframe> -->
  <div id="editor"></div>
  <div id="editor1"></div>
  <pre>dsadsadsdsadaa dsadasdsadasdsa dsadasdsad</pre>
  <div style="display: none" id="content">
    <p>This is editable text. You can focus it and start typing.</p>
    <p>To apply styling, you can select a piece of text and manipulate its</p>
    <!-- <h3>Hello ProseMirror</h3>
    <span class="ct-status">ppppppppppppppppppppp</span>

    <p>This is editable text. You can focus it and start typing.</p>

    <p>
      To apply styling, you can select a piece of text and manipulate its
      styling from the menu. The basic schema supports <em>emphasis</em>,
      <strong>strong text</strong>,
      <a href="http://marijnhaverbeke.nl/blog">links</a>,
      <code>code font</code>, and <img src="/img/smiley.png" /> images.
    </p>

    <p>
      Block-level structure can be manipulated with key bindings (try
      ctrl-shift-2 to create a level 2 heading, or enter in an empty textblock
      to exit the parent block), or through the menu.
    </p>

    <p>
      Try using the “list” item in the menu to wrap this paragraph in a numbered
      list.
    </p> -->
  </div>
</template>

<style>
.ct-status {
  border: 1px solid red;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
