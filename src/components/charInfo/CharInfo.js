import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,

    
  };



  marvelSecrives = new MarvelService();

  componentDidMount() {
    this.updateChar();

  }

  componentDidUpdate(prev, prevState) {
    if (this.props.charId !== prev.charId) {
      this.updateChar();
    }
  }


  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelSecrives.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, homepage, thumbnail, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
          {
             thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ?  <img className='contain' src={thumbnail} alt={name} /> :  <img src={thumbnail} alt={name} />
          }
   
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} rel="noreferrer" target="_blank" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} rel="noreferrer" target="_blank" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
          {comics.length > 0 ? null : 'no comics with this character'} 
        {comics.map((item,i) => {
          return (
              <li key={i} className="char__comics-item">
                {item.name}
                </li>
          );
        }) }
      </ul>
    </>
  );
};


CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
