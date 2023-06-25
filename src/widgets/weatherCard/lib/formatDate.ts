import i18n from 'shared/config/i18n';

export const formatDate = (
    date: string | number,
    options: Intl.DateTimeFormatOptions,
) => {
    const normalizedDate = new Date(date);

    return new Intl.DateTimeFormat(i18n.language, options).format(
        normalizedDate,
    );
};
