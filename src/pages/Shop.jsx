import { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/common/ProductCard";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category.toLowerCase())),
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="bg-neutral-50 min-h-screen font-montserrat">
      {/* Page Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-medium text-neutral-black mb-2">
            Shop Collection
          </h1>
          <p className="text-neutral-black">
            Discover {filteredProducts.length}{" "}
            {selectedCategory !== "all" ? selectedCategory : ""} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="bg-white shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-neutral-black/30 hover:border-neutral-black transform transition-color duration-500 text-neutral-black hover:bg-neutral-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Category Filter - Desktop */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 font-medium transition-colors capitalize transform duration-500 ${
                    selectedCategory === category
                      ? "bg-accent-900 text-primary-50"
                      : "bg-neutral-black/5 text-neutral-black hover:bg-neutral-black/10"
                  }`}
                >
                  {category === "all" ? "All Products" : category}
                </button>
              ))}
            </div>

            {/* Sort & View Mode */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-neutral-black/30 bg-neutral-white text-neutral-black text-sm focus:outline-none hover:border-neutral-black transform transition-colors duration-500"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Mode Toggle - Desktop only */}
              <div className="hidden md:flex items-center gap-1 border border-neutral-black/30 hover:border-neutral-black transform transition-colors duration-500 p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-accent-900 text-neutral-white"
                      : "text-neutral-black hover:bg-neutral-100"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-accent-900 text-neutral-white"
                      : "text-neutral-black hover:bg-neutral-100"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Category Filter */}
          {showMobileFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-neutral-black/10">
              <h3 className="font-semibold text-accent-900 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setShowMobileFilters(false);
                    }}
                    className={`px-4 py-2 font-medium transition-colors capitalize text-sm ${
                      selectedCategory === category
                        ? "bg-neutral-black/90 text-primary-50"
                        : "bg-neutral-black/5 text-accent-900"
                    }`}
                  >
                    {category === "all" ? "All Products" : category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {currentProducts.length > 0 ? (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
                  : "flex flex-col gap-4"
              }
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-4 py-2 border transition-colors ${
                    currentPage === 1
                      ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
                      : "border-neutral-black/30 text-neutral-black hover:bg-neutral-100"
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-neutral-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 border transition-colors ${
                          currentPage === page
                            ? "bg-accent-900 text-white border-accent-900"
                            : "border-neutral-black/30 text-neutral-black hover:bg-neutral-100"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-4 py-2 border transition-colors ${
                    currentPage === totalPages
                      ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
                      : "border-neutral-black/30 text-neutral-black hover:bg-neutral-100"
                  }`}
                  aria-label="Next page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          // No Results
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <SlidersHorizontal className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
              No products found
            </h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your filters to see more products
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSortBy("default");
                setCurrentPage(1);
              }}
              className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
