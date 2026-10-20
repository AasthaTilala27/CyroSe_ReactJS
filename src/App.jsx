import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("Latest");
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const categoryMatch =
      category === "Latest" ||
      movie.category === category ||
      (category === "Episodes" && movie.year.includes("E"));

    const searchMatch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-vh-100 bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border border-secondary px-3 py-1">
        <div className="container-fluid">
          <button
            className="navbar-brand fs-3 text-light border-0 bg-transparent"
            onClick={() => setCategory("Latest")}
          >
            CYRO.SE
          </button>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav me-auto">
              {["Latest", "TV Series", "Movies", "Episodes"].map((item) => (
                <li className="nav-item" key={item}>
                  <button
                    className={`nav-link ${category === item ? "active" : ""
                      }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            <input
              type="search"
              className="form-control form-control-sm rounded-pill w-auto"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn btn-primary btn-sm rounded-circle ms-lg-3 mt-2 mt-lg-0">
              Cyro
            </button>
          </div>
        </div>
      </nav>

      <main className="container-fluid bg-light py-3 px-3">
        <div className="row g-3">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
                <div
                  className="text-center h-100"
                  role="button"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <h6 className="small fw-bold text-dark text-truncate mb-2">
                    {movie.title} ({movie.year})
                  </h6>

                  <div className="position-relative overflow-hidden rounded shadow">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="img-fluid w-100"
                      style={{
                        height: "250px",
                        objectFit: "cover"
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/400x560/252525/ffffff?text=Movie";
                      }}
                    />

                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white bg-dark bg-opacity-75 p-2 opacity-0"
                      style={{
                        transition: "opacity 0.3s"
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0")
                      }
                    >
                      <h6 className="text-danger fw-bold">
                        {movie.title}
                      </h6>

                      <p className="small mb-1">
                        Rating: {movie.rating}
                      </p>

                      <p className="small mb-1">
                        MPAA Rating: R
                      </p>

                      <p className="small mb-1">
                        Quality: 1080p BluRay
                      </p>

                      <p className="small mb-0">
                        Category: {movie.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No movies found</h4>

              <button
                className="btn btn-dark btn-sm"
                onClick={() => {
                  setSearch("");
                  setCategory("Latest");
                }}
              >
                Show All Movies
              </button>
            </div>
          )}
        </div>
      </main>

      
    </div>
  );
}

export default App;