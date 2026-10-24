import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const App = () => {

  const [img, setImg] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [formData, setFormData] = useState({
    height: "",
    width: "",
  });

  const [suggestion, setSuggestion] = useState({
    height: null,
    width: null
  })

  // HANDLE INPUT
  const handleInput = (e) => {
    try {
      const { name, value } = e.target;

      setFormData({
        ...formData,
        [name]: Number(value),
      });

    } catch (err) {
      toast.error(err.message);
    }
  }

  // UPLOAD IMAGE
  const imageUpload = (e) => {
    const input = e.target;
    const file = input.files[0];

    if (!file)
      return toast.error("Image Is Required");

    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;

    image.onload = () => {
      setImg(url);
      setHeight(image.height);
      setWidth(image.width);
    }

  }

  // GET HEIGHT SUGGESTION
  const getHeight = () => {
    try {

      if (!width)
        return toast.error("First Upload Your Image");

      if (!formData.width || formData.width === "")
        return toast.error("Width Is Required");

      setSuggestion({
        ...suggestion,
        height: Math.round((formData.width * height) / width)
      })

    } catch (err) {
      toast.error(err.message);
    }
  }

  // GET WIDTH SUGGESTION
  const getWidth = () => {
    try {

      if (!height)
        return toast.error("First Upload Your Image");

      if (!formData.height || formData.height === "")
        return toast.error("Width Is Required");

      setSuggestion({
        ...suggestion,
        width: Math.round((formData.height * width) / height)
      })

    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[#FCFAFF] px-4 py-8 font-sans text-[#4A1F99] sm:px-6 lg:px-8 lg:py-12">

        {/* Background decoration */}
        <div className="pointer-events-none fixed -right-32 -top-32 h-80 w-80 rounded-full bg-[#E7DCF8]/60 blur-3xl" />
        <div className="pointer-events-none fixed -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#E0E9FF]/70 blur-3xl" />

        <main className="relative mx-auto max-w-5xl">

          {/* Header */}
          <header className="mb-10 text-center sm:mb-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7132DD] to-[#4A1F99] text-white shadow-lg shadow-[#7132DD]/25 transition-transform duration-300 hover:rotate-6 hover:scale-105">
              <i className="ri-image-edit-line text-3xl"></i>
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7132DD] sm:text-sm">
              Smart Image Tools
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#4A1F99] sm:text-4xl lg:text-5xl">
              Image Size <span className="text-[#7132DD]">Finder</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#716783] sm:text-base">
              Find the perfect image dimensions with a clean, simple, and
              intuitive workspace.
            </p>
          </header>

          {/* Main workspace */}
          <section className="overflow-hidden rounded-3xl border border-[#E7DCF8] bg-white/90 shadow-[0_20px_70px_-25px_rgba(74,31,153,0.2)] backdrop-blur-xl">

            {/* Workspace header */}
            <div className="flex flex-col gap-3 border-b border-[#F2EFFA] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <h2 className="text-lg font-bold text-[#4A1F99] sm:text-xl">
                  Image Workspace
                </h2>
                <p className="mt-1 text-sm text-[#8A7DA4]">
                  Upload an image and explore its dimensions.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D6F5EF] px-3 py-1.5 text-xs font-semibold text-[#238A79]">
                <span className="h-2 w-2 rounded-full bg-[#44B4A1]"></span>
                Ready to upload
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-2">

              {/* Upload section */}
              <div className="flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E7DCF8] text-sm text-[#7132DD]">
                    <i className="ri-upload-cloud-2-line"></i>
                  </span>
                  <h3 className="text-sm font-bold text-[#4A1F99]">
                    Upload Image
                  </h3>
                </div>

                {/* Connect your upload handler to this input */}
                <label className="group flex min-h-[280px] flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D6C6F2] bg-gradient-to-b from-[#FCFAFF] to-[#F7F2FF] p-6 text-center transition-all duration-300 hover:border-[#7132DD] hover:bg-[#F2EFFA] sm:min-h-[340px]">
                  <input type="file" accept="image/*" hidden onChange={imageUpload} />

                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#7132DD] shadow-md shadow-[#7132DD]/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-lg">
                    <i className="ri-image-add-line text-4xl"></i>
                  </div>

                  <h4 className="text-base font-bold text-[#4A1F99] sm:text-lg">
                    Drop your image here
                  </h4>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#8A7DA4]">
                    Upload an image to preview it and work with its dimensions.
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#7132DD] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7132DD]/20 transition-all duration-300 group-hover:bg-[#4A1F99] group-hover:shadow-xl">
                    <i className="ri-folder-open-line text-lg"></i>
                    Browse Images
                  </span>

                  <span className="mt-4 text-xs text-[#A49AB8]">
                    Supports JPG, PNG, WEBP and more
                  </span>
                </label>
              </div>

              {/* Image preview section */}
              <div className="flex flex-col">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E0E9FF] text-sm text-[#4569C9]">
                      <i className="ri-eye-line"></i>
                    </span>
                    <h3 className="text-sm font-bold text-[#4A1F99]">
                      Image Preview
                    </h3>
                  </div>

                  <span className="rounded-lg bg-[#F2EFFA] px-2.5 py-1 text-xs font-medium text-[#8069A9]">
                    Live Preview
                  </span>
                </div>

                <div className="flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#E7DCF8] bg-[#F8F6FC] p-4 sm:min-h-[340px]">

                  <div className="flex w-full flex-col items-center justify-center rounded-xl border border-[#E7DCF8]/70 bg-white/70 px-4 py-12 text-center">

                    {img === null ? (
                      <>
                        <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#E7DCF8]/60 text-[#7132DD]">
                          <i className="ri-image-line text-5xl"></i>
                          <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-4 border-white bg-[#D6F5EF] text-[#238A79]">
                            <i className="ri-aspect-ratio-line text-lg"></i>
                          </span>
                        </div>

                        <p className="font-semibold text-[#4A1F99]">
                          No image selected
                        </p>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-[#A49AB8]">
                          Your uploaded image will appear here.
                        </p>
                      </>
                    ) : (
                      <img src={img} alt="Live Preview" />
                    )}

                  </div>
                </div>
              </div>
            </div>

            {/* Dimension controls */}
            <div className="border-t border-[#F2EFFA] bg-[#FCFAFF] px-5 py-6 sm:px-8 sm:py-8">

              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#4A1F99]">
                  Dimension Controls
                </h3>
                <p className="mt-1 text-sm text-[#8A7DA4]">
                  Enter a dimension to calculate the other measurement.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">

                {/* Width control */}
                <div className="rounded-2xl border border-[#E7DCF8] bg-white p-4 transition-all duration-300 hover:border-[#BFA4EF] hover:shadow-lg hover:shadow-[#7132DD]/5 sm:p-5">
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-[#4A1F99]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7DCF8] text-[#7132DD]">
                      <i className="ri-expand-width-line text-lg"></i>
                    </span>
                    Image Width
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="number"
                      onChange={handleInput}
                      value={formData.width}
                      name="width"
                      placeholder="Enter width"
                      className="min-w-0 flex-1 rounded-xl border border-[#E7DCF8] bg-[#FCFAFF] px-4 py-3 text-sm font-medium text-[#4A1F99] outline-none transition-all duration-200 placeholder:text-[#B1A6C4] focus:border-[#7132DD] focus:bg-white focus:ring-4 focus:ring-[#7132DD]/10"
                    />

                    <button
                      type="button"
                      onClick={getHeight}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7132DD] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#7132DD]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4A1F99] hover:shadow-lg active:translate-y-0 sm:shrink-0"
                    >
                      <i className="ri-magic-line text-lg"></i>
                      Get Height
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-[#A49AB8]">
                    <i className="ri-information-line mr-1"></i>
                    Set the width to find the matching height.
                  </p>
                </div>

                {/* Height control */}
                <div className="rounded-2xl border border-[#E0E9FF] bg-white p-4 transition-all duration-300 hover:border-[#A9BFF8] hover:shadow-lg hover:shadow-[#4569C9]/5 sm:p-5">
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-[#4A1F99]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E0E9FF] text-[#4569C9]">
                      <i className="ri-expand-height-line text-lg"></i>
                    </span>
                    Image Height
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="number"
                      onChange={handleInput}
                      value={formData.height}
                      name="height"
                      placeholder="Enter height"
                      className="min-w-0 flex-1 rounded-xl border border-[#E0E9FF] bg-[#FCFAFF] px-4 py-3 text-sm font-medium text-[#4A1F99] outline-none transition-all duration-200 placeholder:text-[#B1A6C4] focus:border-[#4569C9] focus:bg-white focus:ring-4 focus:ring-[#4569C9]/10" />

                    <button
                      type="button"
                      onClick={getWidth}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A1F99] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#4A1F99]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7132DD] hover:shadow-lg active:translate-y-0 sm:shrink-0"
                    >
                      <i className="ri-magic-line text-lg"></i>
                      Get Width
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-[#A49AB8]">
                    <i className="ri-information-line mr-1"></i>
                    Set the height to find the matching width.
                  </p>
                </div>
              </div>

              {/* Dimension suggestions */}
              <div className="mt-6 rounded-2xl border border-[#D6F5EF] bg-gradient-to-br from-[#F2FFFC] to-[#D6F5EF]/40 p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#44B4A1]/15 text-[#278F7E]">
                    <i className="ri-ruler-2-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#245F57]">
                      Dimension Suggestions
                    </h3>
                    <p className="mt-1 text-xs text-[#638E86]">
                      Your calculated image dimensions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#D6F5EF] bg-white/80 p-4 transition-all duration-200 hover:bg-white">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7DCF8] text-[#7132DD]">
                        <i className="ri-arrow-left-right-line text-lg"></i>
                      </span>
                      <div>
                        <p className="text-xs font-medium text-[#8A7DA4]">
                          Width Suggestion
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#4A1F99]">
                          {suggestion.width || "Awaiting input"}
                        </p>
                      </div>
                    </div>
                    <i className="ri-more-line text-xl text-[#44B4A1]"></i>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#D6F5EF] bg-white/80 p-4 transition-all duration-200 hover:bg-white">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0E9FF] text-[#4569C9]">
                        <i className="ri-arrow-up-down-line text-lg"></i>
                      </span>
                      <div>
                        <p className="text-xs font-medium text-[#8A7DA4]">
                          Height Suggestion
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#4A1F99]">
                          {suggestion.height || "Awaiting input"}
                        </p>
                      </div>
                    </div>
                    <i className="ri-more-line text-xl text-[#44B4A1]"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-7 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
            <span className="flex items-center gap-2 text-xs font-medium text-[#8A7DA4]">
              <i className="ri-shield-check-line text-base text-[#44B4A1]"></i>
              Simple and intuitive image sizing
            </span>
            <span className="hidden text-[#D6C6F2] sm:inline">•</span>
            <span className="text-xs text-[#A49AB8]">
              Built By Sarfraj Shaikh
            </span>
          </footer>
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </>
  );
};

export default App;
