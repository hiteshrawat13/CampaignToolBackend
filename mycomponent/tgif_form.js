const tgif_form=[
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"CAMP_NAME",
                required:true

            },
            {
                type:"input",
                name:"PRIVACY_POLICY",
                required:true

            },
            {
                type:"select",
                name:"ASSET_TYPE",
                required:true,
                optons:[
                    {label:"Select..","value":""},
                    {label:"Whitepaper","value":"Whitepaper"},
                    {label:"Ebook","value":"Ebook"}
                ]

            }
           
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"PIXEL_LINK",
                required:true
                 
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"col",
                children:[
                    {
                        type:"input",
                        name:"CLIENT_CODE",
                        label:"Client Code",
                        readOnly:true,
                        required:true
                    }
                ]
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"ASSET_TYPE",
                required:true
                 
            },
            {
                type:"input",
                name:"ASSET_TYPE",
                required:true
                 
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"input",
                name:"ASSET_TYPE",
                required:true
                 
            }
        ]
    },
    {
        type:"row",
        children:[
            {
                type:"textarea",
                name:"ASSET_TYPE",
                label:"EDM Abstract",
                required:true
                 
            }
        ]
    },
    {
        type:"row",
        children:[
            
            {
                type:"col",
                children:[
                    {
                        type:"switch",
                        name:"SAME_AS_EDM_ABSTRACT",
                        required:true
                        
                    },
                    {
                        type:"checkbox",
                        name:"SAME_AS_EDM_TITLE",
                        required:false,
                        onChecked:{
                            hide:"LANDING_ABSTRACT"
                        }

                    },
                    {
                        type:"textarea",
                        name:"LANDING_ABSTRACT",
                        required:true,
                        showIfChecked:"SAME_AS_EDM_TITLE"
                        
                    }
                ]
                 
            }
        ]
    }
]

export default tgif_form