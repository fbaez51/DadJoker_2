using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FBLib.DadJoker;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace DadJoker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JokeRatingController : Controller
    {
        [HttpPost("[action]")]
        public int RatingUpsert(JokeUserRating jokeUserRating)
        {
            JokeUserRating.JokeUserRating_Upsert(jokeUserRating.JokeID, jokeUserRating.UserID, jokeUserRating.JokeRatingByUser);

            return 1;
        }
    }
}