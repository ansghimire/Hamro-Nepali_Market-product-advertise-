import React, { useState, useEffect } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import { Container, Typography, Stack, Alert } from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import axios from 'axios'
import { useAuth } from '../../../utils/auth'
import { useParams, useNavigate } from 'react-router-dom'

const Product = (props) => {
  const { id } = useParams()
  const [data, setData] = useState(props.initialValues)
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0)
  const auth = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    let interval = setInterval(() => {
      if(successMessage !== ''){
        navigate('/')
      }
    }, 3000);
    return () => {
      clearInterval(interval)
    }
   
  }, [successMessage])
  

  const stepTitle = ['Add Product Info', 'Product Warranty Details', 'Product Specification']
  const stepIcon = [<LooksOneIcon sx={{ fontSize: "3rem" }} />, <LooksTwoIcon sx={{ fontSize: "3rem" }} />, <Looks3Icon sx={{ fontSize: "3rem" }} />]


  // submitted data to the server
  const makeRequest = (values) => {
    console.log("Form Submitted", values);

    let attribute_name = props.result.map(element => {
      return element.attribute_name
    })

    const new_values = { ...values }
    new_values.type = id

    const output = []
    for (let value in new_values) {
      attribute_name.forEach(element => {
        if (element === value) {
          output.push(new_values[value])
          delete new_values[value]
        }
      })
    }
    new_values.productattributevalues = output
    // console.log(new_values)

    axios.post(`http://localhost:8000/api/product/`, new_values,
      {
        headers: {
          Authorization: `Bearer ${auth.access}`
        }
      })
      .then(response => {
        if (response.data) {
          setSuccessMessage('Succesfully Added The Ad of the Product')
        }
      }).catch(error => {
        if(error){
        setErrorMessage('Something went wrong')
        }
      })
  };
  // End of submiting data logic


  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} result={props.result} />

  ];



  return (
    <Container fixed>


  {
     successMessage &&  <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert onClose={() => {setSuccessMessage('') }}>{successMessage}</Alert>
      </Stack>
      }

     { errorMessage &&  <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error" onClose={() => {setErrorMessage('') }}>{errorMessage}</Alert>
      </Stack>
      }

      <div className="flex mb-4 space-x-3">
        <div>  {stepIcon[currentStep]} </div>
        <Typography variant="h3">{stepTitle[currentStep]}</Typography>
      </div>
      {steps[currentStep]}

      <div>

      </div>

    </Container>
  )
}

export default Product