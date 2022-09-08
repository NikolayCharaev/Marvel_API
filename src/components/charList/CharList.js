import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210

  };

  marvelSecrives = new MarvelService();

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelSecrives.getAllCharacter(offset)
    .then(this.onCharListLoaded)
    .catch(this.onError);
  };

  componentDidMount() {
    this.onRequest();
  }

  onCharListLoaded = (newCharList) => {
    this.setState(({charList, offset}) => ({
        charList : [...charList, ...newCharList],
        loading: false,
        newItemLoading: false,
        offset : offset + 9
    }));
    
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderItems(arr) {
    const notFountImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const items = arr
      .filter((elem) => {
        return elem.thumbnail !== notFountImage;
      })
      .map((item) => {
        return (
          <li
            key={item.id}
            onClick={() => {
              this.props.onCharSelected(item.id);
            }}
            className="char__item">
            {item.thumbnail ===
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? (
              <img className="contain" src={item.thumbnail} alt="" />
            ) : (
              <img src={item.thumbnail} alt="" />
            )}
            <div className="char__name">{item.name}</div>
          </li>
        );
      });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, offset,newItemLoading} = this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          onClick={() => {
            this.onRequest(offset)
            console.log(offset)
          }}
          disabled={newItemLoading}
          className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
export default CharList;
