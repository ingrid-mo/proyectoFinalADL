import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TextField from "@mui/material/TextField";
import ButtonOutline from '../Buttons/buttonBigoutline/buttonOutline';
import { postReviewProduct } from '../../api/getApi';
import "./style.css";
// import { AuthContext } from '../../context/AuthContext';
// import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ReviewComponent = ({ selectedProductId,selectuserId }) => {
    const [value, setValue] = useState(2);
    const [coment, setcoment] = useState("");
    const [reviewSuccess, setReviewSuccess] = useState("");
 
    const [loading, setLoading] = useState(false); 
    const [createdAt, setCreatedAt] = useState('');
 
 
    const postReview = async () => {
         try {
            setLoading(true); // Iniciar carga
            
            const now = new Date();
            const formattedDateTime = now.toISOString();
            setCreatedAt(formattedDateTime);        
            
          
            const response = await postReviewProduct( selectedProductId,selectuserId, value, coment );
            console.log(response)

            /* if (response.statusCode === 201) {
                setReviewSuccess(true);
                toast(' ¡Gracias, por tu comentario!',)
                console.log("Cantidad de estrellas y texto ingresado correctamente:", { value, coment });
                setTimeout(() => {
                    // Hacer algo después de que la alerta desaparezca
                }, 3000);
            } else {
                setReviewSuccess(false);
                console.log("Cantidad de estrellas:", value);         
                console.log("Texto ingresado:", coment);
                console.log("product id:", selectedProductId);
                console.log(" user id:", selectuserId);
                console.log("fecha:", createdAt);
                toast(' ¡Gracias, por tu comentario! usp',)
                console.log("Cantidad de estrellas y texto ingresado fallidamente:", { value, coment });
            } */
        } catch (error) {
            setReviewSuccess(false);
            toast(' tu producto no fue reseñado ',)
            console.log("Cantidad de estrellas y texto ingresado (catch):", { value, coment });
        } finally {
            setLoading(false); // Detener carga independientemente del resultado
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postReview();
    };

    console.log("Cantidad de estrellas:", value);
    console.log("Texto ingresado:", coment);

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={4}
            width={400}
            paddingTop={10}
            textAlign={'center'}
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <ToastContainer/>
            <form className='form_review'>
                <h2>Coméntanos sobre tu experiencia</h2>
                <Typography component="legend">¿Cómo te pareció tu producto?</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    size="large"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log("Cantidad de estrellas:", newValue);
                    }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Detalles de producto"
                    multiline
                    variant="filled"
                    rows={4}
                    defaultValue="ejemplo, medicamento para personas hipertensas"
                    value={coment}
                    onChange={(e) => setcoment(e.target.value)}
                    onBlur={() => console.log("Texto ingresado:", coment)}
                />
                <ButtonOutline type="submit" disabled={loading} onClick={handleSubmit}>
                    Enviar
                </ButtonOutline>
                <Box>
                    {reviewSuccess === "" ? (
                        ""
                    ) : reviewSuccess ? (
                        <div>Registro exitoso.</div>
                    ) : (
                        <div>Ha ocurrido un error ingresar tu comentario.</div>
                    )}
                </Box>
            </form>
        </Box>
    );
}

export default ReviewComponent;
