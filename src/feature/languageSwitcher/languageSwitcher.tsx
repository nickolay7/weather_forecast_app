import React from 'react';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as Globe } from 'shared/assets/icons/earthglobe.svg';

import cls from './langSwitcher.module.scss';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div className={cls.langSwitcher}>
            <div className={cls.wrapper}>
                <Globe />
                {'  '}
                <Select
                    name="language"
                    value={i18n.language}
                    onChange={handleChange}
                    variant={'standard'}
                >
                    <MenuItem value={'en'}>EN</MenuItem>
                    <MenuItem value={'ru'}>RU</MenuItem>
                    <MenuItem value={'uk'}>UA</MenuItem>
                </Select>
            </div>
        </div>
    );
};
