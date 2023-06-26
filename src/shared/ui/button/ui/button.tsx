import { ButtonHTMLAttributes, memo } from 'react';

import { classNames } from '../../../helpers/classNames';

import cls from './button.module.scss';
import { ElementTheme } from '../../../types/ui';

export enum ButtonSize {
    S = 'small',
    L = 'large',
    XL = 'extra',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ElementTheme;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button = memo(
    ({ className, children, ...otherProps }: ButtonProps) => {
        const {
            variant = ElementTheme.CLEAR,
            size = ButtonSize.S,
            disabled,
        } = otherProps;

        return (
            <button
                type="button"
                className={classNames(
                    cls.Button,
                    {
                        [cls.disabled]: disabled,
                    },
                    [className, cls[variant], cls[size]],
                )}
                disabled={disabled}
                {...otherProps}
            >
                {children}
            </button>
        );
    },
);
