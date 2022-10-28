import React from 'react';
import TextInput from '../../../components/TextInput';

import { useTranslation } from 'react-i18next';
export default function AddFabricant(props) {
  console.log('props', props);
  const { translate, setLibrary, library, formData, setFormData } = props;
  const { t } = useTranslation();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            placeholder="Nom Fabricant"
            label="Nom Fabricant"
            name="name"
            onChange={handleChange}
            value={formData.name}
            // translate={translate}
          />
        </div>
        <div className="w-full px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Fabricant Url"
            label="Fabricant Url"
            name="url"
            onChange={handleChange}
            value={formData.url}
            // translate={translate}
          />
        </div>
      </div>
    </form>
  );
}
