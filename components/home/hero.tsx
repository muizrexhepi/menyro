import { SearchBar, SearchFilters } from "./search-bar";

export const Hero = () => {
  const handleSearch = (filters: SearchFilters): void => {
    console.log("Search initiated with filters:", filters);
    // Here you would typically call your search API
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-50 animate-pulse delay-500"></div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Discover great
          <span className="text-emerald-600 block">restaurants near you</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Find and book tables at the best restaurants across the Balkans and
          Europe. From local gems to international cuisine, your perfect dining
          experience awaits.
        </p>
        <SearchBar onSearch={handleSearch} />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
              2,500+
            </div>
            <div className="text-gray-600">Restaurants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
              15+
            </div>
            <div className="text-gray-600">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
              50K+
            </div>
            <div className="text-gray-600">Happy Diners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
              4.8★
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};
