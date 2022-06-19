import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
function App() {
  interface IZip {
    city: string;
    code: Number;
  }
  const zipCodes = [
    {
      city: "Atlanta",
      code: 30311
    },
    {
      city: "Dallas",
      code: 75215
    },
    {
      city: "Fort Worth",
      code: 76244
    },
    {
      city: "Fresno",
      code: 93706
    },
    {
      city: "Houston",
      code: 77001
    },
    {
      city: "Lake Forest",
      code: 92610
    },
    {
      city: "Los Angeles",
      code: 90062
    },
    {
      city: "Napa",
      code: 94559
    },
    {
      city: "Palo Alto",
      code: 94020
    },
    {
      city: "Oakland",
      code: 94610
    },
    {
      city: "Riverside",
      code: 92504
    },
    {
      city: "Sacramento",
      code: 95818
    },
    {
      city: "San Antonio",
      code: 78207
    },
    {
      city: "San Diego",
      code: 92107
    },
    {
      city: "San Francisco",
      code: 94112
    },
    {
      city: "San Jose",
      code: 95128
    },
    {
      city: "Stockton",
      code: 95210
    },
    {
      city: "Santa Rosa",
      code: 94952
    },
    {
      city: "Thousand Oaks",
      code: 93065
    },
    {
      city: "Walnut Creek",
      code: 94507
    },
    {
      city: "Watsonville",
      code: 95076
    },
    {
      city: "Yuba City",
      code: 95991
    }];
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [valid, setValid] = useState<String>();
  const [zipOptions, setZipOtions] = useState<IZip[]>([]);

  useEffect(() => {
    if (search.length === 0) {
      setValid('');
    }
    if (search.length > 1) {
      validateZip(search);
      const filterZip: IZip[] = zipCodes.filter((zip) => {
        return Object.values(zip).some((word) =>
          String(word).toLowerCase().includes(search)
        );
      });;
      setZipOtions(filterZip);
      if(filterZip.length > 0) setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [debounceSearch])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSelect = (zip: IZip) => {
    console.log('search', search)
    setSearch(zip.code.toString())
    setShowOptions(false)
  }

  const validateZip = (code: string) => {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
    if (isValidZip) setShowOptions(false);
    setValid(isValidZip ? 'valid' : 'invalid')
  }

  return (
    <div
      className="px-0 md:px-6 py-6 flex h-screen items-center justify-center bg-gradient-to-tr from-blue-200 to-blue-500 dark:text-white dark:from-gray-600 dark:to-blue-800"
    >
      <div
        className="w-11/12 md:w-7/12 lg:w-6/12 shadow-2xl rounded-lg bg-white p-5"
      >
        <div className="">
          <label className="block text-gray-700 font-semibold mb-1">
            ZIP / Postal code
          </label>
          <div className="flex relative">
            <input
              className="appearance-none block w-full border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:rounded-b-none"
              id="zip"
              type="number"
              placeholder="90210"
              value={search}
              onChange={ e => setSearch(e.target.value) }
            />
            <div className="absolute right-0 p-1.5">
              {
                valid === 'valid'
                  ? <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="#16a34a" d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06a.733.733 0 0 1 1.047 0l3.052 3.093l5.4-6.425a.247.247 0 0 1 .02-.022Z" /></svg>
                  : valid === "invalid" 
                    ? <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="#dc2626" d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                    : <></>
              }
            </div>
          </div>

          {
            showOptions
              ? <div className="overflow-y-auto max-h-64 shadow-md border border-gray-500 rounded rounded-t-none">
                {
                  zipOptions.map((zip, idx) => {
                    return <div key={idx} className="px-4 py-3 border-t hover:bg-gray-200 cursor-pointer" onClick={() => onSelect(zip)}>
                      <span className='mr-1 text-gray-600'>{zip.city}</span>
                      <span>({zip.code.toString()})</span>
                    </div>
                  })
                }
              </div>
              : <></>
          }
          {
            valid === 'invalid'
              ? <p className="text-red-600 mt-1">The value is not a valid postal code</p>
              : <></>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
