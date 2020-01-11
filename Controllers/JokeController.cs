using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FBLib.DadJoker;
using System.Data.SqlClient;

namespace DadJoker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JokeController : ControllerBase
    {
        [HttpGet("[action]")]
        public IEnumerable<Joke> FetchAllJokes()
        {
            return Joke.FetchAllJokesRandomizedFromDB();
        }

        [HttpGet("[action]")]
        public IEnumerable<JokeRatingTop> FetchTopJokes()
        {
            return JokeRatingTop.JokeRating_Top();
        }
    }
}