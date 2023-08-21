import React from 'react';
import Sidebar from '../../styled-components/Sidebar/Sidebar';
import { BodyContainer } from '../../styled-components/Body/styles';
import { SpotifyBody } from '../../pages/Home/styles.js';
import Footer from '../../styled-components/Footer/Footer';
import {
    PlaylistContainer,
    CardContainer,
    TableContainerStyled,
    CardLeftContainer,
    CardRightContainer,
    ImagePlaylist,
    StyledH1
} from '../Song/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const columns = [
    { id: 'play', label: '', minWidth: 10},
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'listeners', label: 'Listeners', minWidth: 170 },
    { id: 'duration', label: 'Duration', minWidth: 100 }
];

function createData(title, listeners, duration) {
    return { title, listeners, duration };
}

const rows = [
    createData('Mockingbird', '1,279,110,019', '4:10'),
    createData('Without Me', '1,119,230,219', '4:10'),
    createData('Lose Yourself', '1,279,110,019', '5:22'),
];

const ArtistPage = () => {

    const artistData = {
        name: 'Eminem', 
        image: 'https://i.scdn.co/image/ab67706c0000da8454b133282efaec2a07cc05fc',
    };

    return (
        <>
            <SpotifyBody>
                <Sidebar />
                <BodyContainer css={`align-items: center;`}>
                    <PlaylistContainer>
                        <CardContainer>
                            <CardLeftContainer>
                                <ImagePlaylist src={artistData.image}></ImagePlaylist>
                            </CardLeftContainer>

                            <CardRightContainer>
                                <StyledH1>{artistData.name}</StyledH1>
                            </CardRightContainer>
                        </CardContainer>
                        <TableContainerStyled>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table" sx={{ margin: 0 }}>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                  key={column.id}
                                                  align={column.align}
                                                  style={{ minWidth: column.minWidth, backgroundColor: 'transparent', color: '#fff', fontWeight: 'bold' }}
                                                >
                                                  {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, rowIndex) => ( 
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column, columnIndex) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        sx={{ backgroundColor: 'transparent', color: '#fff' }}
                                                    >
                                                        {column.id === 'play' && columnIndex === 0 ? (
                                                            <PlayCircleOutlineIcon fontSize="small" cursor="pointer" />
                                                        ) : null}
                                                        {column.id === 'title' && columnIndex === 1 ? (
                                                            <span>{row.title}</span>
                                                        ) : null}
                                                        {column.id === 'listeners' && columnIndex === 2 ? (
                                                            <span>{row.listeners}</span>
                                                        ) : null}
                                                        {column.id === 'duration' && columnIndex === 3 ? (
                                                            <span>{row.duration}</span>
                                                        ) : null}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TableContainerStyled>
                    </PlaylistContainer>
                </BodyContainer>
            </SpotifyBody>
          <Footer />
        </>
    )
}

export default ArtistPage;
