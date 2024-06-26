import React from 'react';
import { Link } from 'react-router-dom';
import './Gallery.component.css';
import { Footer } from '../../common/Footer/Footer.component';

const images = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Image 1',
    description: 'Description of Image 1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Image 2',
    description: 'Description of Image 2',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Image 3',
    description: 'Description of Image 3',
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Image 4',
    description: 'Description of Image 4',
  },
  {
    id: 5,
    imageUrl: 'https://via.placeholder.com/600',
    title: 'Image 5',
    description: 'Description of Image 5',
  },
];

export const Gallery = () => {
  return (
    <div className="fade-in">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <div className="row">
          {images.map(image => (
            <div className="col-lg-4 col-md-6 mb-4" key={image.id}>
              <div className="card">
                <img src={image.imageUrl} className="card-img-top" alt={image.title} />
                <div className="card-body">
                  <h5 className="card-title">{image.title}</h5>
                  <p className="card-text">{image.description}</p>
                  <Link to={`/gallery/${image.id}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
