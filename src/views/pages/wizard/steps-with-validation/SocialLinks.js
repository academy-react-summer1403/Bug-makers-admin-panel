import React, { useEffect, useRef, useState } from 'react';
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
  const existingData = useSelector((state) => state.create.createList);
  const dispatch = useDispatch();

  const [editorInstance, setEditorInstance] = useState(null);

  const defaultValues = {
    Describe: course.describe || ''
  };

  // ** React Hook Form Setup
  const { control, handleSubmit, setError, setValue, formState: { errors } } = useForm({ defaultValues });

  // ** Editor.js Instance Setup
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize Editor.js
    const editor = new EditorJS({
      holder: 'editorjs', // This is the id of the div element that will hold the editor
      tools: {
        header: {
          class: Header,
          inlineToolbar: true
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,   // YouTube embed
              vimeo: true,     // Vimeo embed
              instagram: true, // Instagram embed
            }
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        simpleImage: {
          class: SimpleImage,
          inlineToolbar: true
        },
        linkTool: LinkTool,
        raw: Raw
      },
      onReady: () => {
        console.log('Editor.js is ready to work!');
      },
      onChange: () => {
        console.log('Editor content changed!');
      }
    });

    // Set the editor instance in state
    setEditorInstance(editor);

    // Cleanup function to destroy the editor on component unmount
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, []);

  // Function to convert EditorJS data to HTML
  const convertEditorToHTML = (editorData) => {
    let htmlContent = '';
    editorData.blocks.forEach(block => {
      switch (block.type) {
        case 'header':
          htmlContent += `<h2>${block.data.text}</h2>`;
          break;
        case 'paragraph':
          htmlContent += `<p>${block.data.text}</p>`;
          break;
        case 'list':
          htmlContent += '<ul>';
          block.data.items.forEach(item => {
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
          block.data.items.forEach(item => {
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

  // ** Form Submit Handler
  const onSubmit = async (data) => {
    // Get the data from the editor
    const editorData = await editorInstance.save();

    // Check if the editor data is valid and contains content
    if (!editorData.blocks || editorData.blocks.length === 0) {
      setError('Describe', {
        type: 'manual',
        message: 'Please enter a valid description'
      });
      return;
    }

    // Convert editor data to HTML
    const htmlContent = convertEditorToHTML(editorData);

    // Set the HTML content into the react-hook-form Describe field
    setValue('Describe', htmlContent);

    // If all fields are valid, combine the data
    if (Object.values(data).every(field => field.length > 0)) {
      const combinedData = {
        ...existingData,
        ...data,
        Describe: htmlContent, // Add the HTML content from the editor
      };

      stepper.next();
      dispatch(setCreate(combinedData));
    }
  };

  return (
    <div>
      <div className='content-header'>
        <h5 className='mb-0'>Social Links</h5>
        <small>Enter Your Social Links.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12} style={{minHeight:'250px'}}>
            <Label for='Describe'>Description</Label>
            <div id="editorjs" style={{minHeight: '300px'}}></div> {/* This is the container for Editor.js */}
            {errors.Describe && <span className='text-danger'>{errors.Describe.message}</span>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0' />
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-submit'>
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SocialLinks;
