import React from "react";
import Btn from './Button';
import './button.stories.scss';


// Default export for the story
export default {
  title: 'Atoms/Button',
  component: Btn,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary', 'secondary', 'success', 'info', 'danger', 'warning', 'light', 'dark', 'white',
        'outline-primary', 'outline-secondary', 'outline-success', 'outline-info',
        'outline-danger', 'outline-warning', 'outline-light', 'outline-dark', 'outline-white'
      ],
    },
    size: {
      control: { type: 'radio' },
      options: ['lg', 'md', 'sm', 'xs'],
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
    iconName: {                               // by changing bootstrap icon name form bootstrap the icon will change in output
      control: { type: 'text' },
    },
    text: {
      control: { type: 'text' },
    },
    customClass: {                          // this custom button by place react bootstrap className it can access the properties of className 
      control: { type: 'text' },            //this will do button border-radius 5% 
    },
    iconType: {
      control: { type: 'select' },
      options:["bootstrap", "feather"]
    },
    iconOnly: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    block: {
      control: { type: 'boolean' },
    },
  },
};

// Template for creating stories
const Template = (args) => <Btn {...args} />;

// Exporting the AllButtons in story with different variants
export const AllButtons = () => (
  <>
    {/* Button variantions for rounder corners */}
    <br></br>
    <h3>Default Variant Buttons</h3>
    <section className=" rounded">
      <Template variant="primary" text="Primary" customClass={`bg-primary-600`}/>&nbsp;
      <Template variant="secondary" text="Secondary" />&nbsp;
      <Template variant="success" text="Success" />&nbsp;
      <Template variant="info" text="Info" />&nbsp;
      <Template variant="danger" text="Danger" />&nbsp;
      <Template variant="warning" text="Warning" />&nbsp;
      <Template variant="light" text="Light" />&nbsp;
      <Template variant="dark" text="Dark" />&nbsp;
    </section>

    {/* Button variantions for rounder corners */}
    <br></br>
    <h3 class="mb-2">Rounded Variant Buttons</h3>
    <section className=" rounded">
      <Template variant="primary" text="Primary" rounded />
      <Template variant="secondary" text="Secondary" rounded />
      <Template variant="success" text="Success" rounded />
      <Template variant="info" text="Info" rounded />
      <Template variant="danger" text="Danger" rounded />
      <Template variant="warning" text="Warning" rounded />
      <Template variant="light" text="Light" rounded />
      <Template variant="dark" text="Dark" rounded />
    </section>

    <br></br>
    {/* Outline of all variantions */}
    <h3 class="mb-2">Outline Variant Buttons</h3>
    <section className="outline">
      <Template variant="outline-primary" text="Outline Primary" />
      <Template variant="outline-secondary" text="Outline Secondary" />
      <Template variant="outline-success" text="Outline Success" />
      <Template variant="outline-info" text="Outline Info" />
      <Template variant="outline-danger" text="Outline Danger" />
      <Template variant="outline-warning" text="Outline Warning" />
      <Template variant="outline-light" text="Outline Light" />
      <Template variant="outline-dark" text="Outline Dark" />
    </section>
    <br></br>
    <br></br>

    <div className="row">
      <div className="col-lg-6">
        {/* Size variants of all buttons */}
        <h3 class="mb-2">Size variantions</h3>
        <p>size="lg"</p><p>Allowed values: "lg", "md", "sm", "xs"</p>
        <section className="outline">
          <Template variant="outline-primary" size="lg" text="Outline Primary" />
          <Template variant="outline-secondary" size="md" text="Outline Secondary" />
          <Template variant="outline-success" size="sm" text="Outline Success" />
          <Template variant="outline-info" size="xs" text="Outline Info" />
        </section>

      </div>
      <div className="col-lg-6">
        {/* Icon variantions of all buttons */}
        <h3 class="mb-2">Icon variations</h3>
        <p>iconName="ArrowRight"  </p>
        <p>iconPosition="left".  </p>
        <section className="outline">
          <Template variant="outline-primary" size="lg" iconName="ArrowRight" iconPosition="left" text="Outline Primary" />
          <Template variant="outline-secondary" size="md" iconName="ArrowRight" iconPosition="left" text="Outline Secondary" />
          <Template variant="outline-success" size="sm" iconName="ArrowRight" iconPosition="right" text="Outline Success" />
          <Template variant="outline-info" size="xs" iconName="ArrowRight" iconPosition="right" text="Outline Info" />
        </section>
      </div>
    </div>


    {/* Create a bootstrap row */}
    {/* <div className="row"> 
      <div className="col-lg-6">

      </div>
      <div className="col-lg-6">

      </div>      
    </div> */}


  </>
);

AllButtons.storyName = 'All Button Variants';

// this single button stories show how to control the props in control and redesign the button

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  buttonBorder: 'default',
  size: 'lg',
  text: 'Sign Up',
  iconPosition: 'left',
  iconOnly: false,
  disabled: false,
  loading: false,
  block: false,
};

// this story with iconbutton 
export const WithIcon = Template.bind({});
WithIcon.args = {
  text: 'Button with Icon',
  iconName: 'Apple', // Example icon name from react-bootstrap-icons
  iconPosition: 'left',
  iconType:'bootstrap'
};


// this story button only icon button 
export const IconOnly = Template.bind({});
IconOnly.args = {
  iconType: 'bootstrap',
  iconName: 'Alarm', // Example icon name from react-bootstrap-icons
  iconOnly: true,
};


// Demo Button states: default, loading, hover, onclick
export const ButtonStates = () => (
  <>
    {
      <div className="row">
        <div className="col-lg-6">
          <h3 class="mb-2">Button States</h3>
          <section className="outline">
            <div class="row d-flex flex-row">
              <div class="col-lg-4">
                <p> Default </p>
                <Template variant="primary" text="Login" />
              </div>
              <div class="col-lg-4">
                <p> Loading (onClick) </p>
                <Template variant="primary" text="Login" loading="true" />
              </div>
              <div class="col-lg-4">
                <p> Add Hover style </p>
                <Template variant="primary" text="Login" />
              </div>
            </div>
          </section>
        </div>
      </div>
    }
  </>
);

ButtonStates.storyName = "Button States Styles"