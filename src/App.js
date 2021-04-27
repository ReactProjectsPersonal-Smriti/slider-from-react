import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
import people from './data';
const App = () => {
  const [reviews, setReviews] = useState(data);
  const [value, setValue] = useState(0);
  const { id, image, name, title, quote } = reviews[value];

  const prevReview = () => {
    setValue((value) => {
      let newValue = value - 1;
      return checkValue(newValue);
    })
  }

  const nextReview = () => {
    setValue((value) => {
      let newValue = value + 1;
      return checkValue(newValue);
    })
  }

  const checkValue = (value) => {
    if (value > reviews.length - 1) {
      return 0;
    }
    if (value < 0) {
      return reviews.length - 1;
    }
    return value;
  }

  useEffect(() => {
    let slider = setInterval(() => {
      setValue(checkValue(value + 1));
    }, 3000);
    return () => clearInterval(slider);
  }, [value])

  return (
    <section className='section'>
      <div className="title">
        <h2>
          <span>/</span> Reviews
      </h2>
      </div>
      <div className="section-center">
        {
          reviews.map((review, reviewIndex) => {
            const { id, image, name, title, quote } = review;
            let position = 'nextSlide';
            if (reviewIndex === value) {
              position = 'activeSlide';
            }
            if (reviewIndex === value - 1 || (value === 0 && reviewIndex === people.length - 1)) {
              position = 'lastSlide';
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className='person-img' />
                <h4>{name}</h4>
                <p className='title'>{title}</p>
                <p className='text'>{quote}</p>
                <FaQuoteRight className='icon' />
              </article>
            );
          })
        }
        <button className='prev'>
          <FiChevronLeft onClick={prevReview} />
        </button>
        <button className='next'>
          <FiChevronRight onClick={nextReview} />
        </button>
      </div>
    </section>
  );
}

export default App;
