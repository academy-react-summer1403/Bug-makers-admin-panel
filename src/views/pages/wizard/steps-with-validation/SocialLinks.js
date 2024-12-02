import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Form, Label } from 'reactstrap';
import { ArrowLeft } from 'react-feather';
import { setCreate } from '../../../../redux/CreateCourse';

// ** Editor.js Imports
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Checklist from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';

const SocialLinks = ({ stepper }) => {
  const course = useSelector((state) => state.CourseDetail.CourseList);
  console.log(course.describe);
  const DescAi = useSelector((state) => state.desc.value);
  console.log(DescAi);
  const existingData = useSelector((state) => state.create.createList);
  const dispatch = useDispatch();

  const [editorInstance, setEditorInstance] = useState(null);
  const editorRef = useRef(null);

  // Default value for form based on the presence of DescAi or course.describe
  const defaultValues = {
    Describe: DescAi ? DescAi : course.describe,
  };

  // React Hook Form setup
  const { control, handleSubmit, setError, setValue, formState: { errors } } = useForm({ defaultValues });

  // Function to parse HTML content to blocks for Editor.js
  const parseHTMLToBlocks = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const blocks = [];

    doc.querySelectorAll('p').forEach((p) => {
      blocks.push({
        type: 'paragraph',
        data: {
          text: p.textContent,
        },
      });
    });

    doc.querySelectorAll('ul').forEach((ul) => {
      const items = [];
      ul.querySelectorAll('li').forEach((li) => {
        items.push(li.textContent);
      });
      blocks.push({
        type: 'list',
        data: {
          style: 'unordered',
          items: items,
        },
      });
    });

    doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((header) => {
      blocks.push({
        type: 'header',
        data: {
          level: parseInt(header.nodeName[1]),
          text: header.textContent,
        },
      });
    });

    doc.querySelectorAll('blockquote').forEach((blockquote) => {
      blocks.push({
        type: 'quote',
        data: {
          text: blockquote.textContent,
        },
      });
    });

    doc.querySelectorAll('img').forEach((img) => {
      blocks.push({
        type: 'simpleImage',
        data: {
          file: {
            url: img.src,
          },
          caption: img.alt || '',
        },
      });
    });

    return blocks;
  };

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              vimeo: true,
              instagram: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        simpleImage: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        linkTool: LinkTool,
        raw: Raw,
      },
      onReady: () => {
        console.log('Editor.js is ready to work!');
        
        if (DescAi) {
          editor.blocks.insert('paragraph', {
            text: DescAi,
          });
        } else if (course.describe) {
          const blocks = parseHTMLToBlocks(course.describe);
          blocks.forEach((block) => {
            editor.blocks.insert(block.type, block.data);
          });
        }
      },
      onChange: () => {
        console.log('Editor content changed!');
      },
    });

    setEditorInstance(editor);

    // Cleanup function to destroy the editor on component unmount
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [course.describe, DescAi]);

  // Convert EditorJS data to HTML
  const convertEditorToHTML = (editorData) => {
    let htmlContent = DescAi ? DescAi : course.describe;
    editorData.blocks.forEach((block) => {
      switch (block.type) {
        case 'header':
          htmlContent += `<h2>${block.data.text}</h2>`;
          break;
        case 'paragraph':
          htmlContent += `<p>${block.data.text}</p>`;
          break;
        case 'list':
          htmlContent += '<ul>';
          block.data.items.forEach((item) => {
            htmlContent += `<li>${item}</li>`;
          });
          htmlContent += '</ul>';
          break;
        case 'quote':
          htmlContent += `<blockquote>${block.data.text}</blockquote>`;
          break;
        case 'embed':
          htmlContent += `<iframe src="${block.data.embed}" frameborder="0"></iframe>`;
          break;
        case 'checklist':
          htmlContent += '<ul>';
          block.data.items.forEach((item) => {
            htmlContent += `<li>${item.checked ? '<strike>' : ''}${item.text}${item.checked ? '</strike>' : ''}</li>`;
          });
          htmlContent += '</ul>';
          break;
        default:
          break;
      }
    });
    return htmlContent;
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const editorData = await editorInstance.save();

    if (!editorData.blocks || editorData.blocks.length === 0) {
      setError('Describe', {
        type: 'manual',
        message: 'Please enter a valid description',
      });
      return;
    }

    const htmlContent = convertEditorToHTML(editorData);

    // Set the HTML content into the react-hook-form Describe field
    setValue('Describe', htmlContent);

    // Combine the data and dispatch to Redux
    if (Object.values(data).every((field) => field.length > 0)) {
      const combinedData = {
        ...existingData,
        ...data,
        Describe: htmlContent,
      };

      stepper.next();
      dispatch(setCreate(combinedData));
    }
  };

  return (
    <div>
      <div className="content-header">
        <h5 className="mb-0">توضیحات دوره</h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12} style={{ minHeight: '250px' }}>
            <Label for="Describe">توضیحات</Label>
            <div id="editorjs" style={{ minHeight: '300px' }}></div> {/* This is the container for Editor.js */}
            {errors.Describe && <span className="text-danger">{errors.Describe.message}</span>}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-submit">
            بعدی
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SocialLinks;
