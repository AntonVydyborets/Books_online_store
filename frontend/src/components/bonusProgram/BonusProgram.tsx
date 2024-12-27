import s from './BonusProgram.module.scss'

const BonusProgram = () => {
  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <div className={s.left}>
          <p className={s.title}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <ol>
            <li>adipisicing elit</li>
            <li>adipisicing elit</li>
            <li>adipisicing elit</li>
            <li>adipisicing elit</li>
          </ol>
        </div>
        <div className={s.right}>
          <div>
            <p className={s.subtitle}>Lorem ipsum dolor sit</p>
            <ul>
              <li>dolor sit</li>
              <li>dolor sit</li>
              <li>dolor sitdolor sitdolor sitdolor sitdolor sit</li>
              <li>dolor sit</li>
            </ul>
            <button className={s['btn-register']}>btn-register</button>
          </div>
          <div>
            <p className={s.subtitle}>Lorem ipsum dolor sit</p>
            <ul>
              <li>ipsum doloriolor</li>
              <li>ipsum dolor</li>
              <li>ipsum dolor</li>
              <li>ipsum dolor</li>
            </ul>
            <button className={s['btn-check-account']}>check-account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BonusProgram
