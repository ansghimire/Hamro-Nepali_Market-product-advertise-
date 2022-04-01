import * as Yup from 'yup'

const validationSchemaControl = (control) => {
  switch(control){
      case "title":
          return  Yup.string().required("Required")
      case "description":
          return  Yup.string().required("Required")
      case "price":
          return Yup.number().required("Required")

      case "price_negotiable":
          return Yup.string().required("Required")

      case "condition":
          return Yup.string().required("Required")
    
      case "used_for":
          return Yup.string().required("Required")

      case "owndership_document_provided":
          return Yup.string().required("Required")
      
    case "home_delivery":
        return Yup.string().required("Required")

    case "delivery_area":
        return Yup.string().required("Required")

    case "warranty_type":
        return Yup.string().required("Required")
    case "warranty_period":
        return Yup.string().required("Required")
    
      case "RAM":
          return Yup.string().required("Required")
      case "Screen_Size":
          return Yup.string().required("Required")
    
      default : return null
  }


};

export default validationSchemaControl;
