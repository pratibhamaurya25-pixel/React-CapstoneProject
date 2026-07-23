import { Link } from "react-router-dom";
import "../styles/Home.css";

const categories = [
  {
    name: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    products: "25 Products",
  },
  {
    name: "Fashion",
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050257.png",
    products: "30 Products",
  },
  {
    name: "Accessories",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    products: "12 Products",
  },
  {
    name: "Footwear",
    image: "https://cdn-icons-png.flaticon.com/512/2589/2589909.png",
    products: "15 Products",
  },
];

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}

      <section className="hero">
        <div className="hero-content">
          <h1>
            Shop Smart,
            <br />
            Live Better
          </h1>

          <p>
            Discover amazing products at the best prices. Upgrade your lifestyle
            with smart shopping.
          </p>

          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="shopping"
          />
        </div>
      </section>

      {/* Categories */}

      <section className="categories">
        <h2>Featured Categories</h2>

        <div className="category-grid">
          {categories.map((item) => (
            <div className="category-card" key={item.name}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>

                <p>{item.products}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
