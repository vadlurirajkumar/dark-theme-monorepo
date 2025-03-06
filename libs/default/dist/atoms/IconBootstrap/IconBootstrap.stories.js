import React from "react";
import {IconBootstrap, IconSizes} from "./IconBootstrap";
// import ReactBootstrapIcon from "../Ico/BootIcon";

export default {
    title: "Unused/IconBootstrap",
    component: IconBootstrap,
    tags: ["autodocs"],
    parameters: {
        component: IconBootstrap,
        componentSubtitle: "All Types Buttons",
        actions: {
            argTypesRegex: "^on.*",
            handles: ["mouseover", "click .btn"],
        },
    },
    argTypes: {
        // variant: {
        //     control: {
        //         type: "inline-radio",
        //         options: IconVariants,
        //     },
        // },
        size: {
            control: {
                type: "inline-radio",
                options: IconSizes,
            },
        },
        // color: {
        //     control: {
        //         type: "inline-radio",
        //         // options: ["reset", "submit", "button"],
        //     },
        // }
    },
};

const Template = (args) => <IconBootstrap {...args} />;

// export const all = (args) => {
//   return (
//       <>
//           <IconBootstrap
//               // variant="primary"
//               iconName="ArrowLeft"
//               size="lg"
//               // onClick={() => {}}
//           />
//           &nbsp;
//       </>
//   );
// };

export const IconDemo = Template.bind({});

IconDemo.args = {
    ...IconDemo.args,
    size: "lg",
};
