using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VCAuthn.IdentityServer;
using VCAuthn.Services.Contracts;

namespace VCAuthn.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class PresentationRequestController : ControllerBase
    {
        private readonly ISessionStorageService _sessionStorageService;
        private readonly IUrlShortenerService _urlShortenerService;
        private readonly ILogger<WebHooksController> _logger;

        public PresentationRequestController(ISessionStorageService sessionStorageService, IUrlShortenerService urlShortenerService, ILogger<WebHooksController> logger)
        {
            _sessionStorageService = sessionStorageService;
            _urlShortenerService = urlShortenerService;
            _logger = logger;
        }

        [HttpGet(IdentityConstants.ChallengePollUri)]
        public async Task<ActionResult> Poll([FromQuery(Name = IdentityConstants.ChallengeIdQueryParameterName)] string presentationRequestId)
        {
            if (string.IsNullOrEmpty(presentationRequestId))
            {
                _logger.LogDebug($"Missing presentation request Id");
                return NotFound();
            }

            var authSession = await _sessionStorageService.FindByPresentationIdAsync(presentationRequestId);
            if (authSession == null)
            {
                _logger.LogDebug($"Cannot find a session corresponding to the presentation request. Presentation request Id: [{presentationRequestId}]");
                return NotFound();
            }

            if (authSession.PresentationRequestSatisfied == false)
            {
                _logger.LogDebug($"Presentation request was not satisfied. AuthSession: [{authSession}]");
                return BadRequest();
            }


            return Ok();
        }

        [HttpGet("/url/{key}")]
        public async Task<ActionResult> ResolveUrl(string key)
        {
            _logger.LogDebug($"Resolving shortened url: {Request.Path.Value}");

            if (string.IsNullOrEmpty(key))
            {
                _logger.LogDebug("Url key is null or empty");
                return BadRequest();
            }

            var url = await _urlShortenerService.GetUrlAsync(key);
            if (string.IsNullOrEmpty(url))
            {
                _logger.LogDebug($"Url is empty. Url key: [{key}]");
                return NotFound();
            }
            
            _logger.LogDebug($"Redirecting to {url}");
            return Redirect(url);
        }
    }
}