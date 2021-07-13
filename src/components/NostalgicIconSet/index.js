import React from 'react'
import styled, { css } from 'styled-components'

// ================================================================================================================
// OrkutNostalgicIconSet
// ================================================================================================================
export function OrkutNostalgicIconSet(props) {
    return (
        <OrkutNostalgicIconSet.List>
            {[
                {name: 'Recados', slug: 'recados', icon: 'book'},
                {name: 'Fotos', slug: 'fotos', icon: 'camera'},
                {name: 'Videos', slug: 'videos', icon: 'video-camera'},
                {name: 'Fãs', slug: 'fas', icon: 'star'},
                {name: 'Mensagens', slug: 'mensagens', icon: 'email'},
            ].map(({name, slug, icon, total}) => (
                <li key={`orkut__icon_set__${slug}`}>
                    <span style={{gridArea: 'title'}} className="OrkutNostalgicIconSet__title">
                        {name}
                    </span>
                    <span className="OrkutNostalgicIconSet__number" style={{gridArea: 'number'}}>
                        <img key={`orkut__icon_set__${slug}_img`} className="OrkutNostalgicIconSet__iconSample"
                             src={`https://alurakut.vercel.app/icons/${icon}.svg`} />
                        {props[slug] ? props[slug] : 0}
                    </span>
                </li>
            ))}
            {[
                {name: 'Confiável', slug: 'confiavel', icon: 'smile'},
                {name: 'Legal', slug: 'legal', icon: 'cool'},
                {name: 'Sexy', slug: 'sexy', icon: 'heart'},
            ].map(({name, slug, icon}) => {
                const total = props[slug] ? props[slug] : 0
                return (
                    <li key={`orkut__icon_set__${slug}`}>
            <span className="OrkutNostalgicIconSet__title">
              {name}
            </span>
                        <span className="OrkutNostalgicIconSet__iconComplex" className="OrkutNostalgicIconSet__number"
                              style={{gridArea: 'number'}}>
              {[0, 1, 2].map((_, index) => {
                  const isHeartActive = index <= (total - 1)
                  return <img key={`orkut__icon_set__${slug}_img_${index}`}
                              src={`https://alurakut.vercel.app/icons/${icon}.svg`}
                              style={{marginRight: '2px', opacity: isHeartActive ? 1 : '0.5'}} />
              })}
            </span>
                    </li>
                )
            })}
        </OrkutNostalgicIconSet.List>
    )
}

OrkutNostalgicIconSet.List = styled.ul`
  margin-top: 32px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  li {
    font-size: 12px;
    color: #5A5A5A;
    display: grid;
    grid-template-areas:
      "title title"
      "number number";

    &:not(:last-child) {
      margin-right: 5px;
    }

    .OrkutNostalgicIconSet__title {
      display: block;
      font-style: italic;
    }

    .OrkutNostalgicIconSet__number {
      min-width: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .OrkutNostalgicIconSet__iconSample {
        margin-right: 7px;
      }
    }
  }
`

// ================================================================================================================
// Login Page
// ================================================================================================================
const AlurakutLoginScreen = css`
  :root {
    --backgroundPrimary: #D9E6F6;
    --backgroundSecondary: #F1F9FE;
    --backgroundTertiary: #FFFFFF;
    --backgroundQuarternary: #BBCDE8;
    --colorPrimary: #2E7BB4;
    --colorSecondary: #388BB0;
    --colorTertiary: #2F4A71;
    --colorQuarternary: #D81D99;
    --textPrimaryColor: #333333;
    --textSecondaryColor: #FFFFFF;
    --textTertiaryColor: #5A5A5A;
    --textQuarternaryColor: #C5C6CA;
    --commonRadius: 8px;
  }


  .loginScreen {
    padding: 16px;
    max-width: 1110px;
    display: grid;
    --gap: 12px;
    --gutter: 16px;
    grid-gap: var(--gap);
    grid-template-areas: 
      "logoArea"
      "formArea"
      "footerArea";
    @media (min-width: 860px) {
      grid-template-columns: 2fr 1fr;
      grid-template-areas: 
              "logoArea formArea"
              "logoArea formArea"
              "footerArea footerArea";
    }

    .logoArea {
      grid-area: logoArea;
      background-color: var(--backgroundTertiary);
      border-radius: var(--commonRadius);
      padding: var(--gutter);
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 263px;
      @media (min-width: 860px) {
        min-height: 368px;
      }

      p {
        font-size: 12px;
        line-height: 1.2;

        &:not(:last-child) {
          margin-bottom: 12px;
        }

        strong {
          color: var(--colorQuarternary);
        }
      }

      img {
        max-height: 45px;
        margin-bottom: 36px;
      }
    }

    .formArea {
      grid-area: formArea;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--gutter);
        padding-left: 50px;
        padding-right: 50px;
        background-color: var(--backgroundSecondary);
        border-radius: var(--commonRadius);
        flex: 1;

        &:not(:last-child) {
          margin-bottom: var(--gap);
        }

        &:first-child {
          min-height: 224px;
          @media (min-width: 860px) {
            min-height: 282px;
          }
        }

        p {
          font-size: 14px;
        }

        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }

        input {
          width: 100%;
          display: block;
          border: 1px solid var(--textQuarternaryColor);
          padding: 12px;
          background-color: var(--backgroundTertiary);
          border-radius: var(--commonRadius);
          margin-top: 24px;
          margin-bottom: 16px;
        }

        button {
          width: 100%;
          display: block;
          border: 0;
          padding: 12px;
          border-radius: var(--commonRadius);
          background-color: var(--colorPrimary);
          color: var(--textSecondaryColor);
        }
      }
    }

    .footerArea {
      grid-area: footerArea;
      background-color: var(--backgroundQuarternary);
      border-radius: var(--commonRadius);
      padding: 8px;

      p {
        font-size: 12px;
        text-align: center;

        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }
      }
    }
  }
`

// ================================================================================================================
// Reset Styles
// ================================================================================================================
export const AlurakutStyles = css`
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  *::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  a,
  button {
    cursor: pointer;
    transition: .3s;
    outline: 0;

    &:hover,
    &:focus {
      opacity: .8;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }
  }

  input {
    transition: .3s;
    outline: 0;

    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }

    &:hover,
    &:focus {
      box-shadow: 0px 0px 5px #33333357;
    }
  }

  ${AlurakutLoginScreen}
`