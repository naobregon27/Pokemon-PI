import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,} from 'react-router-dom';
import { loadingSearchSet, resetSearchPokemon, searchPokemon } from "../../store/actions/";
import lupa from "../../pictures/search-Pokemon.png";
import Pagination from "../Pagination/Pagination";
import style from "./SearchBar.module.css";


export default function SearchBar() {
    const [search, setSearch] = useState("");
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const pokemonFound = useSelector((state) => state.pokemonFound);
    const searchingPokemon = useSelector((state) => state.searchingPokemon);
    const loadingPokemons = useSelector((state) => state.loadingPokemons);//quedamos aca
    const notFound = useSelector((state) => state.notFound);


    useEffect(() => {
        if (!notFound && searchingPokemon && !loadingPokemons) {
            dispatch(resetSearchPokemon());
            navigate(`/pokemons/${pokemonFound?.id}`);
        }

    }, [notFound, searchingPokemon, loadingPokemons, dispatch, navigate, pokemonFound?.id]);



    function onSubmit(e) {
        e.preventDefault();

        dispatch(loadingSearchSet());
        dispatch(searchPokemon(search.toLowerCase()));
        setSearch("");

    }



    function onInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <div className={style.search_bar_conteiner}>
            {/* <div>
                {<div className={style.search_bar_subconteiner}>
                    <form className={style.form_search_bar} onSubmit={onSubmit}>
                        <input className={style.searchbar_input_text} type="text" value={search} onChange={onInputChange} placeholder="Enter Pokemon to search" />
                        <button className={style.searchbar_input_submit} type="submit" onClick={e=>onSubmit(e)}>Search</button>
                        <img className={style.searchbar_input_lupa} src={lupa} alt="lupa" />
                    </form>
                </div>

                }

            </div> */}

            <div>
                <div className={style.search_bar_subconteiner}>
                    <Pagination />
                </div>
            </div>
        </div>
    );

}