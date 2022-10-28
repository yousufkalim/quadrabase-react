import React, { useEffect } from 'react';
import TextInput from '../../../components/TextInput';

import { useTranslation } from 'react-i18next';
export default function EditFabricant(props) {
  console.log('props', props);

  const { translate, fabricant, formData, setFormData } = props;

  useEffect(() => {
    setFormData({
      name: fabricant?.name ? fabricant?.name : '',
      url: fabricant?.url ? fabricant?.url : ''
    });
  }, []);
  console.log('props for edit', props);
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
            label=" Nom Fabricant"
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
