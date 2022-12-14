import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import {changeCurrent} from "../../redux/navbarSlice";
import Box from "@mui/material/Box";
import { useSelector } from 'react-redux';
import Button from '../global/utils/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import ConfirmDeletePopup from '../global/popup/ConfirmDeletePopup';

import { signOut } from '../../functions/auth';
import useGetBooksByQuery from '../../hooks/useGetBooksByQuery';
import Preview from '../global/utils/Preview';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate()
    const [docId , setDocId] = useState("")
    const { user } = useSelector(state => state.authSlice);
    
    const dispatch = useDispatch();
    
    const {data , pending , error} = useGetBooksByQuery("createdBy" , "==" , user.uid)
    
    React.useEffect(() => {
        dispatch(changeCurrent("profile"))
    },[dispatch])

    return (
        <>
        <Box
        sx={{
            width : "100%",
            display : "flex",
            justifyContent : "center"

        }}>
            <Box
            sx={{
                display : "flex",
                flexDirection : "column",
                alignItems : "center",
                width : "min(1000px , 80vw)",
                minHeight : "calc(100vh - 60px)"
            }}>

                <Box
                sx={{
                    position : "relative",
                    display : "flex",
                    justifyContent : "flex-start",
                    alignItems : "flex-start",
                    width : "100px",
                    height : "100px",
                    bgcolor : "primary.main",
                    borderRadius : "50%",
                    mt : 1,
                }}>
                    <Button
                    onClick={() => {
                        signOut()
                    }}
                    sx={{
                         border : "2px solid",
                         borderColor : "white.main",
                         boxShadow : "",
                         p : .8,
                         zIndex : "1"
                    }}>
                        <LogoutIcon
                        sx={{
                            fontSize : "1.2rem",
                            color : "white.main"
                        }}/>
                    </Button>

                    <PersonIcon
                    sx={{
                        fontSize : "4rem",
                        color : "white.main",
                        position : "absolute",
                        bottom : "50%",
                        right : "50%",
                        transform : "translateY(50%) translateX(50%)"
                    }}/>
                </Box>

                <Typography
                sx={{
                    fontFamily : "roboto",
                    fontWeight : "700",
                    my : 2
                }}>
                    {user?.name}
                </Typography>

                <Box
                sx={{
                    display : "block",
                    width :"min(700px,80%)",
                    height : "1px",
                    bgcolor : "gray.dark",
                    mb : {
                        xs : 2,
                        lg : 3,
                        xl : 4,
                    }
                }}/>

                { data?.length === 0 &&
                <Box
                sx={{
                    display : "grid",
                    width : "80%",
                    justifyContent : "center",
                }}>

                        { (!pending && data?.length === 0) &&
                            <Box
                            sx={{
                                display : "grid",
                                placeItems : "center"
                            }}>
                            <Typography
                            sx={{
                                color : "black.main",
                                fontSize : "1rem",
                                mb : 1
                            }}
                            >
                                You haven't written any books yet                            
                            </Typography>
                            <Button
                            onClick={() => {
                                navigate("/create")
                            }}
                            sx={{
                                borderRadius : "500px",
                                px : 2,
                            }}>
                                <Typography
                                sx={{
                                    color : "white.main",
                                    fontSize : "14px",
                                    fontWeight : "500"
                                }}
                                >
                                    Write a book
                                </Typography>
                            </Button>
                            </Box>
                        }
                    
                </Box>
                }
                
                { !pending && !error &&
                <Box
                sx={{
                    display : "grid",
                    width : "80%",
                    justifyContent : "center",
                    gridTemplateColumns :{ 
                        xs :"repeat(auto-fit,minmax(100px,1fr))",
                        md :"repeat(auto-fit,minmax(125px,1fr))",
                        lg :"repeat(auto-fit,minmax(165px,1fr))",
                        xl :"repeat(auto-fit,minmax(220px,1fr))",
                    },
                    placeItems : "center",
                    rowGap : 2,
                }}>
                        {data?.map((item , idx) => {
                            return(
                                <Preview
                                cover={item.cover}
                                key={idx}
                                onDelete={() => {
                                    setDocId(item.docId)
                                }}
                                bookId={item.docId}
                                type="book"/>
                            )
                        })}
                </Box>
                }

            </Box>
            
        </Box>

        <ConfirmDeletePopup
        docId={docId}
        setDocId={setDocId}
        />

        </>
    );
}

export default Profile;
