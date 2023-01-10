import React, { useEffect } from 'react';
import TextInput from '../../../components/TextInput';

import { useTranslation } from 'react-i18next';
export default function EditFabricantLibrary(props) {
  const { translate, setNewLibrary, library, text } = props;
  const { t } = useTranslation();

  useEffect(() => {
    console.log('library', library);
    console.log('text', text);
    setNewLibrary(text ? text : '');
  }, []);
  const handleChange = e => {
    const { name, value } = e.target;
    console.log('value ', value);
    setNewLibrary(value);
  };

  return (
    <form
      className="w-full pt-9"
      style={{
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Fabricant Bibliothèque"
            label="Fabricant Bibliothèque"
            name="library"
            onChange={handleChange}
            value={library}
            translate={translate}
          />
        </div>
      </div>
    </form>
  );
}
