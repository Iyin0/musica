import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewSongs } from "./store/allSongs";
// import * as id3 from '//unpkg.com/id3js@^2/lib/id3.js';
// import jsmediatags from "jsmediatags"

const AddPlaylist = () => {

    const jsmediatags = window.jsmediatags;

    const allSongs = useSelector((state) => state.addSongs.songs)
    const addSongs = useDispatch();
    const [songs, setSongs] = useState(allSongs)
    const [playlistPageState, setPlaylistPageState] = useState(false)

    const addSong = () => {

        let newSongs = []

        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = () => {
            Array.from(input.files).forEach(async (song) => {

                jsmediatags.read(song, {
                    onSuccess: function async(tags) {
                        let imgSrc = ''
                        let genreSrc = ''
                        if (tags.tags.picture !== undefined) {
                            const data = tags.tags.picture.data
                            const format = tags.tags.picture.format
                            let base64String = ""

                            for (let i = 0; i < data.length; i++)
                                base64String += String.fromCharCode(data[i])
                            imgSrc = `data:${format};base64,${window.btoa(base64String)}`
                        }

                        if (tags.tags.genre !== undefined) {
                            genreSrc = tags.tags.genre
                        }

                        newSongs.push({
                            title: tags.tags.title,
                            artist: tags.tags.artist,
                            album: tags.tags.album,
                            genre: genreSrc,
                            image: imgSrc,
                            src: URL.createObjectURL(song)
                        })
                        setSongs(songs.concat(newSongs))
                        // console.log(tags)
                    },
                    onError: function (error) {
                        console.log(error);

                    }
                })
                // const tags = await id3.fromFile(song)
                //     newSongs.push({
                //         title: tags.title,
                //         artist: tags.artist,
                //         album: tags.album,
                //         genre: tags.genre,
                //         image: `data:${format};base64,${window.btoa(base64String)}`,
                //         // image: tags.images,
                //         // image: 'data:image/jpg;base64,' + btoa(arrayString),
                //         year: tags.year,
                //         src: URL.createObjectURL(song)
                //     })
                // setSongs(allSongs.concat(newSongs))
            })
        };
        input.click();
    }

    useEffect(() => {
        addSongs(addNewSongs(songs))
        // console.log(songs)
    }, [songs, addSongs])

    return (
        <div className="add-playlist">
            <button onClick={() => setPlaylistPageState(false)}>Close</button>
            <form action="">
                <label htmlFor="">Name</label><br />
                <input type="text" /><br />
                <label htmlFor="">Description</label><br />
                <input type="text" /><br />
                <button onClick={() => addSong()}>Add Songs</button>
            </form>
        </div>

    );
}

export default AddPlaylist;