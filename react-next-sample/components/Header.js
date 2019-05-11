import Link from 'next/link'

export default function Header () {
  return (
    <div className="blue">

      <style global jsx>{`
        .btn{
          margin-right: 15px;
          color: #fff;
          user-select: none;
          border: 1px solid transparent;
          padding: .375rem .75rem;
          font-size: 1rem;
          font-family: 'Arial';
          line-height: 1.5;
          border-radius: .25rem;
          transition: color .15s;
          text-decoration: none 
        }
        
        .btn1{
          background-color: #007bff;
          border-color: #007bff;
        }
        
        .btn2{
          background-color: #6c757d;;
          border-color: #6c757d;
        }
        
        .btn3{
          background-color: #28a745;
          border-color: #28a745;
        }
        
        .btn4{
          background-color: #ffc107;
          border-color: #ffc107;
        }
        
        .btn5{
          background-color: #17a2b8;
          border-color: #17a2b8;
        }
        
        .btn-sm{
          line-height: 1;
          font-size: 0.75rem;
        }

        a:hover {
          opacity: 0.6;
        }

        .errorMsg {
          color: red;
        }
        `}</style>

      <Link href='/'>
        <a className="btn btn1">Home</a>
      </Link>
      <Link href='/userstats'>
        <a className="btn btn2">Users statistics</a>
      </Link>
      <Link href='/projectstats'>
        <a className="btn btn3">Projects statistics</a>
      </Link>
      <Link href='/plans'>
        <a className="btn btn4">Planned time</a>
      </Link>
      <Link href='/trends'>
        <a className="btn btn5">Trends</a>
      </Link>
    </div>
  )
}
