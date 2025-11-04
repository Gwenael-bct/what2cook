import { useState, useEffect } from 'react';

export default function IngredientSearch({ icon: Icon }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Détecter la langue du navigateur
  const getBrowserLang = () => {
    const browserLang = navigator.language || navigator.languages[0];
    // Si la langue commence par "fr", utiliser "fr", sinon "en"
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  };
  
  const [lang] = useState(getBrowserLang());

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    const timeout = setTimeout(async () => {
      try {
        // Essayer d'abord avec le proxy, puis en fallback avec l'URL complète
        let apiUrl = `/api/ingredients?q=${encodeURIComponent(query)}&lang=${lang}`;
        let res = await fetch(apiUrl, {
          credentials: 'include'
        });
        
        // Si le proxy ne fonctionne pas (404), essayer avec l'URL complète
        if (!res.ok && res.status === 404) {
          apiUrl = `http://localhost:5000/api/ingredients?q=${encodeURIComponent(query)}&lang=${lang}`;
          res = await fetch(apiUrl, {
            credentials: 'include'
          });
        }
        
        if (!res.ok) {
          let errorData;
          try {
            errorData = await res.json();
          } catch {
            errorData = { error: res.statusText || 'Erreur inconnue' };
          }
          throw new Error(`Erreur ${res.status}: ${errorData.error || 'Erreur lors de la recherche'}`);
        }
        
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erreur recherche ingrédient:', error);
        setError(error.message);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // debounce 300ms
    
    return () => clearTimeout(timeout);
  }, [query, lang]);

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white/10 rounded-xl px-5 py-2">
        <Icon className="text-gray-400" />
        <input
          type="text"
          placeholder={lang === 'fr' ? "Rechercher un ingrédient" : "Search for an ingredient"}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="text-gray-100 font-medium flex-1 bg-transparent p-2 outline-none"
        />
      </div>
      
      {/* Message d'erreur */}
      {error && (
        <div className="absolute z-10 w-full mt-2 bg-red-900/50 rounded-xl shadow-xl px-5 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}
      
      {/* Liste des résultats */}
      {query && results.length > 0 && !error && (
        <ul className="absolute z-10 w-full mt-2 bg-[#1E1E1E] rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {results.map(i => (
            <li 
              key={i.id}
              className="px-5 py-3 text-gray-100 hover:bg-white/10 cursor-pointer transition-colors"
            >
              {lang === 'fr' ? i.name_fr : i.name_en}
            </li>
          ))}
        </ul>
      )}
      
      {isLoading && query && !error && (
        <div className="absolute z-10 w-full mt-2 bg-[#1E1E1E] rounded-xl shadow-xl px-5 py-3 text-gray-400">
          {lang === 'fr' ? 'Recherche en cours...' : 'Searching...'}
        </div>
      )}
    </div>
  );
}
